// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB84e37SjXANh3ZN3xDui8QhhnOc0BKwo4",
  authDomain: "matchme-b6976.firebaseapp.com",
  projectId: "matchme-b6976",
  storageBucket: "matchme-b6976.firebasestorage.app",
  messagingSenderId: "34001876866",
  appId: "1:34001876866:web:c6a2fb6288edfe51e6c19b",
  measurementId: "G-46Y8M1RNN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
//export const db = getDatabase(app);
export default app;