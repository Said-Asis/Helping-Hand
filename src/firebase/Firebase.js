// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4JA97aEf7FiBVnx7ec7061d86khrqNRk",
  authDomain: "helping-hand-c9b36.firebaseapp.com",
  projectId: "helping-hand-c9b36",
  storageBucket: "helping-hand-c9b36.appspot.com",
  messagingSenderId: "490517357044",
  appId: "1:490517357044:web:0ac2a9d1ce5d1b84c559a1",
  measurementId: "G-5M82LKKMFZ"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH=getAuth(FIREBASE_APP);
export const FIREBASE_DB= getFirestore(FIREBASE_APP);
