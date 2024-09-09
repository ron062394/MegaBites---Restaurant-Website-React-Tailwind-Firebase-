// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNl0Hkc1UKFd4SDu61EPNpItlaJjZ9UgI",
  authDomain: "tonkotsucorner.firebaseapp.com",
  projectId: "tonkotsucorner",
  storageBucket: "tonkotsucorner.appspot.com",
  messagingSenderId: "1018128137731",
  appId: "1:1018128137731:web:c909947a6f0349f2669836",
  measurementId: "G-J86QQYKE62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app);


// Note: The custom parameters for redirect_uri have been removed.
// Make sure to add all domains and subdomains of your app to the App Domains field in your app settings.
// This includes adding 'tonkotsucorner.firebaseapp.com' to the allowed domains.
