// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmGzW8Ku9N_5uhrUUQfSYKo2yCOg-Y2EE",
  authDomain: "portfolio-b6d2e.firebaseapp.com",
  projectId: "portfolio-b6d2e",
  storageBucket: "portfolio-b6d2e.appspot.com",
  messagingSenderId: "241067706959",
  appId: "1:241067706959:web:b9a1514dda01680d63b83a",
  measurementId: "G-LLK98Q53YE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);