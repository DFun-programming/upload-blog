// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-dc5ca.firebaseapp.com",
  projectId: "blog-app-dc5ca",
  storageBucket: "blog-app-dc5ca.appspot.com",
  messagingSenderId: "939532487409",
  appId: "1:939532487409:web:4617b75f0323471f63b750"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
