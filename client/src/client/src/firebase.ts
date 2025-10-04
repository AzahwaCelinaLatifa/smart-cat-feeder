// client/src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC3XB3MFf4hc23qpxUArdbd_k3IWEpgijw",
    authDomain: "pawsitivefeed-35842.firebaseapp.com",
    projectId: "pawsitivefeed-35842",
    storageBucket: "pawsitivefeed-35842.appspot.com", // <-- fixed typo here
    messagingSenderId: "366863660021",
    appId: "1:366863660021:web:9793fcdbe10af9a916a6bc",
    measurementId: "G-3DBMHS6YFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
