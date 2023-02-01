import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHCGAVm8_9KSj1vJQOHjJlBlex-h6F3SY",
  authDomain: "chat-354f8.firebaseapp.com",
  projectId: "chat-354f8",
  storageBucket: "chat-354f8.appspot.com",
  messagingSenderId: "667178840506",
  appId: "1:667178840506:web:ea2c41f2ff3aaeb847ed83",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
