import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCWsL9LK77verDFQgHvQZc4zZDv_iFtA6g",
  authDomain: "homework-ff869.firebaseapp.com",
  projectId: "homework-ff869",
  storageBucket: "homework-ff869.firebasestorage.app",
  messagingSenderId: "459275156208",
  appId: "1:459275156208:web:34180b659fc1680e83a035"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);