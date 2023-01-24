import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Create a root reference
const firebaseConfig = {
  apiKey: "AIzaSyCZkwCPt96LzDwBe3QESPwFOhr9o2VoqZ8",
  authDomain: "tgram-38811.firebaseapp.com",
  projectId: "tgram-38811",
  storageBucket: "tgram-38811.appspot.com",
  messagingSenderId: "515307269031",
  appId: "1:515307269031:web:438aa4c7ab963be9f62482",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
