// Initialize
import { initializeApp } from "firebase/app";
// Authenticate
import { getAuth } from "firebase/auth";
// Upload Files
import { getStorage } from "firebase/storage";
// DB operations
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjPRTUw3mLSlMooECIVzEnwirQVwJWxWo",
  authDomain: "producthunt-a8280.firebaseapp.com",
  projectId: "producthunt-a8280",
  storageBucket: "producthunt-a8280.appspot.com",
  messagingSenderId: "262529982963",
  appId: "1:262529982963:web:51794ee8772e3135c8f286",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
