// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjOTzwU_KNl7mLU_CvQl2JrAFYX93ws9k",
  authDomain: "newhopes-d1c9c.firebaseapp.com",
  databaseURL: "https://newhopes-d1c9c-default-rtdb.firebaseio.com",
  projectId: "newhopes-d1c9c",
  storageBucket: "newhopes-d1c9c.appspot.com",
  messagingSenderId: "955343396534",
  appId: "1:955343396534:web:b6b96065e4db0acebb1017",
  measurementId: "G-XF43VY4BXP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
