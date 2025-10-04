// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC3XB3MFf4hc23qpxUArdbd_k3IWEpgijw",
  authDomain: "pawsitivefeed-35842.firebaseapp.com",
  databaseURL: "https://pawsitivefeed-35842-default-rtdb.asia-southeast1.firebasedatabase.app", // penting!
  projectId: "pawsitivefeed-35842",
  storageBucket: "pawsitivefeed-35842.firebasestorage.app",
  messagingSenderId: "366863660021",
  appId: "1:366863660021:web:9793fcdbe10af9a916a6bc",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
