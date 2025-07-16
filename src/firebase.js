import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANXtZzfRLrn7Njzsn6pjqyQXNZix1uD0g",
  authDomain: "wilson-corretor-imoveis.firebaseapp.com",
  projectId: "wilson-corretor-imoveis",
  storageBucket: "wilson-corretor-imoveis.firebasestorage.app",
  messagingSenderId: "515603074585",
  appId: "1:515603074585:web:3ccd86bff9ac1d7472a488",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Exporta as instâncias para serem usadas em outros lugares
export { db, firebaseApp };
