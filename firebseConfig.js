// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {ref} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvyUV8FAe2ij8_dZinSRrsU1XNEAM9WRw",
  authDomain: "monitoring-738b6.firebaseapp.com",
  projectId: "monitoring-738b6",
  storageBucket: "monitoring-738b6.appspot.com",
  messagingSenderId: "875684828117",
  appId: "1:875684828117:web:bd83c12af474b9ee77635c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const reference = ref;

export { auth, app,reference };