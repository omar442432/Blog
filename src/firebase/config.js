import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhxu_AjRY1qkKbz9lH-ysNm0mCt4wlXwY",
  authDomain: "blog-8c4f2.firebaseapp.com",
  projectId: "blog-8c4f2",
  storageBucket: "blog-8c4f2.firebasestorage.app",
  messagingSenderId: "146149862763",
  appId: "1:146149862763:web:0c466cd5707f179fa8302e"

};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);

