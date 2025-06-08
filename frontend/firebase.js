// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-99fe7.firebaseapp.com",
  projectId: "mern-estate-99fe7",
  storageBucket: "mern-estate-99fe7.appspot.com",
  messagingSenderId: "1011730384095",
  appId: "1:1011730384095:web:11c9b9f5dfe3c0405ed56a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);