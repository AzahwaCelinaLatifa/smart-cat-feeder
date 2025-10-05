// index.js
const { onRequest, https } = require("firebase-functions/v2");
const express = require("express");
const path = require("path");
const admin = require("firebase-admin");

admin.initializeApp();

const app = express();

// --- SECURITY & ERROR HANDLING ---
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// --- SERVE REACT STATIC FILES ---
const distPath = path.join(__dirname, "../client/dist");
app.use(express.static(distPath));

// --- SIMPLE API EXAMPLE ---
app.get("/api/hello", (req, res) => {
  try {
    res.json({
      message: "Hello from Firebase Functions + Express!",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in /api/hello endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// --- FALLBACK FOR REACT ROUTER ---
app.get("/*", (req, res) => {
  try {
    res.sendFile(path.join(distPath, "index.html"));
  } catch (error) {
    console.error("Error serving index.html:", error);
    res.status(500).send("Error loading the application");
  }
});

// --- CLOUD FUNCTION: feedNow ---
exports.feedNow = https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new https.HttpsError("unauthenticated", "User must login");
  }

  const uid = context.auth.uid;
  const amount = data.amount || 50; // default 50g

  // 1️⃣ Simpan perintah di RTDB
  const cmdRef = admin.database().ref("commands").push();
  const command = {
    type: "manual_feed",
    uid,
    amount,
    status: "pending",
    createdAt: admin.database.ServerValue.TIMESTAMP,
  };
  await cmdRef.set(command);

  // 2️⃣ Simpan log
  await admin.database().ref(`logs/${cmdRef.key}`).set({
    ...command,
    note: "Command created by user",
  });

  // 3️⃣ (Opsional) Kirim notifikasi ke user via FCM
  try {
    const tokenSnap = await admin
      .database()
      .ref(`users/${uid}/fcmToken`)
      .once("value");
    const token = tokenSnap.val();
    if (token) {
      await admin.messaging().send({
        token,
        notification: {
          title: "Feeder Activated",
          body: `Feeding ${amount}g sent to device.`,
        },
      });
    }
  } catch (err) {
    console.error("FCM failed:", err);
  }

  return { success: true, commandId: cmdRef.key };
});

// --- EXPORT EXPRESS APP SEBAGAI FUNCTION ---
exports.app = onRequest(
  {
    memory: "256MiB",
    timeoutSeconds: 60,
  },
  app
);
