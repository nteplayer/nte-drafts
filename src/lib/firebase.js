import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

  apiKey: "AIzaSyAa_zvBCLyFZKcclMtUfRs_2Tx__JXcTP4",

  authDomain: "nte-tournaments-7b0e3.firebaseapp.com",

  projectId: "nte-tournaments-7b0e3",

  storageBucket: "nte-tournaments-7b0e3.appspot.com",

  messagingSenderId: "1022034023092",

  appId: "1:1022034023092:web:d269068348b24abed93de1"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export {

  createUserWithEmailAndPassword,

  signInWithEmailAndPassword,

  signOut,

  onAuthStateChanged

};
