// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "web-seo-tool-7db0b.firebaseapp.com",
  projectId: "web-seo-tool-7db0b",
  storageBucket: "web-seo-tool-7db0b.appspot.com",
  messagingSenderId: "665671609656",
  appId: "1:665671609656:web:144241dd6b32ec0eff25cd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
