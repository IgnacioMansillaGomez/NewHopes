import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDjOTzwU_KNl7mLU_CvQl2JrAFYX93ws9k",
  authDomain: "newhopes-d1c9c.firebaseapp.com",
  databaseURL: "https://newhopes-d1c9c-default-rtdb.firebaseio.com",
  projectId: "newhopes-d1c9c",
  storageBucket: "newhopes-d1c9c.appspot.com",
  messagingSenderId: "955343396534",
  appId: "1:955343396534:web:b6b96065e4db0acebb1017",
  measurementId: "G-XF43VY4BXP",
});

export const getFirebase = () => {
  return app;
};

export const getFirestore = () => {
  return firebase.firestore(app);
};
