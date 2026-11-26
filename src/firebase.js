// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAElEF1RTCvr26ZIgNShcKspfqJcidt_zY",
  authDomain: "pet-1-5da52.firebaseapp.com",
  projectId: "pet-1-5da52",
  storageBucket: "pet-1-5da52.firebasestorage.app",
  messagingSenderId: "827901274581",
  appId: "1:827901274581:web:0d512c4c6e628d70c7f55c",
  measurementId: "G-1DQT6J5RR7",
  databaseURL:"https://pet-1-5da52-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);