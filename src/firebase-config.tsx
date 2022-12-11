// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDtuPM-5YlPcSynied0mi2lxqjzUgupICo",

  authDomain: "memento-c485e.firebaseapp.com",

  projectId: "memento-c485e",

  storageBucket: "memento-c485e.appspot.com",

  messagingSenderId: "916791647224",

  appId: "1:916791647224:web:7e136ee4f03350f3d9d40d"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)