import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Importa o Firebase Storage

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "wilson-corretor-imoveis.firebaseapp.com",
  projectId: "wilson-corretor-imoveis",
  storageBucket: "wilson-corretor-imoveis.firebasestorage.app", // Estava com .appspot.com e não com .firebasestorage.app
  messagingSenderId: "515603074585",
  appId: "1:515603074585:web:3ccd86bff9ac1d7472a488",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp); // Inicializa o Firebase Storage

// Exporta as instâncias para serem usadas em outros lugares
export { db, auth, storage }; // Exporta o storage também
