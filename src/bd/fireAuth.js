// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_API_KEY } from "../constants/constants";

const firebaseConfig = {
  apiKey: "AIzaSyDjOTzwU_KNl7mLU_CvQl2JrAFYX93ws9k",
  authDomain: "newhopes-d1c9c.firebaseapp.com",
  databaseURL: "https://newhopes-d1c9c-default-rtdb.firebaseio.com",
  projectId: "newhopes-d1c9c",
  messagingSenderId: "955343396534",
  appId: "1:955343396534:web:b6b96065e4db0acebb1017",
  measurementId: "G-XF43VY4BXP",
  storageBucket: "newhopes-d1c9c.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestoredb = getFirestore();
