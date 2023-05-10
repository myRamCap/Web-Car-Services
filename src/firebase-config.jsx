// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpFfDVYCH9L3Mpb_dL83uDXryacoHsJLc",
  authDomain: "one-stop-shop-e-services.firebaseapp.com",
  databaseURL: "https://one-stop-shop-e-services-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "one-stop-shop-e-services",
  storageBucket: "one-stop-shop-e-services.appspot.com",
  messagingSenderId: "825748126214",
  appId: "1:825748126214:web:d6e565055a9dccced62187"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);