// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABmg1XoZJzUfTSMhzhDF8gSagwnWq_3Dc",
  authDomain: "animals-aca69.firebaseapp.com",
  projectId: "animals-aca69",
  storageBucket: "animals-aca69.appspot.com",
  messagingSenderId: "130702553977",
  appId: "1:130702553977:web:b346f39c764bebe92435a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const db = getFirestore(app);
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };