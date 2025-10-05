import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

//  Middleware dasar
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  Logging untuk setiap request /api
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 100) logLine = logLine.slice(0, 99) + "…";
      log(logLine);
    }
  });

  next();
});

//  Jalankan dalam async agar setup Vite bisa menunggu
(async () => {
  const server = await registerRoutes(app);

  //  Middleware global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    log(`Error ${status}: ${message}`);
  });

  //  Setup sesuai environment
  if (app.get("env") === "development") {
    // gunakan Vite dev server untuk hot reload
    await setupVite(app, server);
  } else {
    // production: serve hasil build
    serveStatic(app);
  }

  //  Tentukan port & host aman di Windows
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.HOST || "127.0.0.1";

  try {
    server.listen(port, host, () => {
      log(`Server running at http://${host}:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
