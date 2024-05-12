// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from "@env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtNuVXOBE98OoYFSZUs-kS9e085YG97jc",
  authDomain: "rn-school-3090a.firebaseapp.com",
  projectId: "rn-school-3090a",
  storageBucket: "rn-school-3090a.appspot.com",
  messagingSenderId: "321190427901",
  appId: "1:321190427901:web:2fbf44c6dea1d5b4831294"
  // apiKey: API_KEY,
  // authDomain: AUTH_DOMAIN,
  // projectId: PROJECT_ID,
  // storageBucket: STORAGE_BUCKET,
  // messagingSenderId: MESSAGING_SENDER_ID,
  // appId: APP_ID
};

// Initialize Firebase
// console.log(API_KEY);
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export { database, app };

// TODO: ADD NEW CREDENTIALS
