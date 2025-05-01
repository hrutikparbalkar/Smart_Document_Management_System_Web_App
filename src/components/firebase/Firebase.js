// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { getAuth } from "firebase/auth"; // Import getAuth for authentication
import { getFunctions, httpsCallable } from "firebase/functions"; // Import Cloud Functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const functions = getFunctions(app); // Initialize Cloud Functions

// Collection references
export const userRef = collection(db, 'loginData');
export const folderRef = collection(db, 'folder');
export const messagesRef = collection(db, 'chats');  // Reference for chats collection

// Export Firebase utilities
export { app, db, storage, auth, functions, ref, uploadBytes, getDownloadURL, listAll, httpsCallable };
