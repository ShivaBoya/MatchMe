// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH1zNyXe7S3VLri_JBilKNBXTmFEb8j2I",
  authDomain: "match-dd9a3.firebaseapp.com",
  databaseURL: "https://match-dd9a3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "match-dd9a3",
  storageBucket: "match-dd9a3.firebasestorage.app",
  messagingSenderId: "844658941666",
  appId: "1:844658941666:web:8c552e3c917b11311988bb",
  measurementId: "G-JC11Z8ESMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
//export const db = getDatabase(app);
export default app;