// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwLiu1maihcTzDhkuYoVbKdGsynSGK0d8",
  authDomain: "flipr-830bb.firebaseapp.com",
  projectId: "flipr-830bb",
  storageBucket: "flipr-830bb.appspot.com",
  messagingSenderId: "527421590586",
  appId: "1:527421590586:web:b51306c80e2675a32cb903"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)