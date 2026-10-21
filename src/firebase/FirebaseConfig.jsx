import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPeywHCcE3O2V41WdbD5VP9pP1Opf10u4",
  authDomain: "tech-report-5cb6e.firebaseapp.com",
  projectId: "tech-report-5cb6e",
  storageBucket: "tech-report-5cb6e.firebasestorage.app",
  messagingSenderId: "570377536265",
  appId: "1:570377536265:web:86d9a8a2bb50b0ca6a09d8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const dbFirestore = getFirestore()