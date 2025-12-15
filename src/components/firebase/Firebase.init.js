import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVgXPpktSfvmPD9_m5T8GVnOJQt4XzFi0",
  authDomain: "find-your-opportunity-app.firebaseapp.com",
  projectId: "find-your-opportunity-app",
  storageBucket: "find-your-opportunity-app.firebasestorage.app",
  messagingSenderId: "2689516928",
  appId: "1:2689516928:web:2f7e6f5c6d3fedffc8ad65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);