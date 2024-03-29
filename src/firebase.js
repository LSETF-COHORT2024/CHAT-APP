
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAtrnlHwJM9BconIhemIHhHoaH_KaRYCSc",
  authDomain: "chat-8be1c.firebaseapp.com",
  projectId: "chat-8be1c",
  storageBucket: "chat-8be1c.appspot.com",
  messagingSenderId: "513103485760",
  appId: "1:513103485760:web:3528d09e02ebe8152438a5"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth =getAuth();
 export const storage = getStorage();
 export const db = getFirestore(app);
   
