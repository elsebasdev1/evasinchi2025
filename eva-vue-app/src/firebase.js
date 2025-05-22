import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFHLfBlmLOFFaK_fFS1jyi9Ik7woQFr-M",
  authDomain: "evasinchi2025.firebaseapp.com",
  projectId: "evasinchi2025",
  storageBucket: "evasinchi2025.firebasestorage.app",
  messagingSenderId: "628589403078",
  appId: "1:628589403078:web:a3d55f43e7671b494f70c7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };