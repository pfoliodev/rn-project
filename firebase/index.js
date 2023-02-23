// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApDB-PnpnmdJZiSwVt3yPrWmr-xK-uzuE",
  authDomain: "fireapp-1cda2.firebaseapp.com",
  projectId: "fireapp-1cda2",
  storageBucket: "fireapp-1cda2.appspot.com",
  messagingSenderId: "263461717168",
  appId: "1:263461717168:web:f76972f4fc1a9e5054e775",
  measurementId: "G-TQC3C7F14G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

export {app, db, getFirestore, collection, getDocs, auth, addDoc}