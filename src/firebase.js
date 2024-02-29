
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBA4AL1J97FoykALVMttFECGNJhs-zGZ7I",
  authDomain: "chat-app-a38ff.firebaseapp.com",
  projectId: "chat-app-a38ff",
  storageBucket: "chat-app-a38ff.appspot.com",
  messagingSenderId: "291302061484",
  appId: "1:291302061484:web:a8983a8ea969b1c445b609",
  measurementId: "G-CDL2XLKTEE"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
