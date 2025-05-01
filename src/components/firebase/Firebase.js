// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { getAuth } from "firebase/auth"; // Import getAuth for authentication
import { getFunctions, httpsCallable } from "firebase/functions"; // Import Cloud Functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGTA6XmUTYq3Anytb_1vnmcJ4CGypNwMo",
  authDomain: "document-management-syst-bf74d.firebaseapp.com",
  projectId: "document-management-syst-bf74d",
  storageBucket: "document-management-syst-bf74d.firebasestorage.app", // Fixed storageBucket URL
  messagingSenderId: "553717752230",
  appId: "1:553717752230:web:255de3d79d8a470f0aef67",
  measurementId: "G-TQFS9GK02T"
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
