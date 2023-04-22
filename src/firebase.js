// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmTqKtT8aqHg1VXwIdZbE2oV2tKK9CO6E",
  authDomain: "flipr-5e4d9.firebaseapp.com",
  projectId: "flipr-5e4d9",
  storageBucket: "flipr-5e4d9.appspot.com",
  messagingSenderId: "988148269340",
  appId: "1:988148269340:web:61fe4bac9b81a26b8abad9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)