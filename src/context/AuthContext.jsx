import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Importe do Firebase Auth
import { doc, getDoc } from "firebase/firestore"; // Importe do Firestore
import { auth, db } from "../firebase"; // Suas instâncias de auth e db

// Crie o contexto
const AuthContext = createContext();

// Hook personalizado para usar o contexto facilmente
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor do contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Usuário do Firebase Auth
  const [userData, setUserData] = useState(null); // Dados adicionais do Firestore (nome, role, etc.)
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    // Listener para mudanças no estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user); // Atualiza o usuário do Auth

      if (user) {
        // Se houver um usuário logado, busca os dados adicionais no Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data()); // Define os dados adicionais
        } else {
          console.warn(
            "Documento de usuário não encontrado no Firestore para UID:",
            user.uid
          );
          setUserData(null);
        }
      } else {
        // Se não houver usuário logado, limpa os dados
        setUserData(null);
      }
      setLoading(false); // Finaliza o carregamento após a verificação inicial
    });

    // Limpa o listener ao desmontar o componente
    return unsubscribe;
  }, []); // Executa apenas uma vez na montagem

  // O valor que será disponibilizado para os componentes filhos
  const value = {
    currentUser, // Objeto de usuário do Firebase Auth
    userData, // Objeto com nome, sobrenome, role, etc. do Firestore
    loading, // Estado de carregamento da autenticação/dados
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Renderiza os filhos apenas quando o carregamento inicial estiver completo */}
      {!loading && children}
      {loading && <div>Carregando autenticação...</div>}{" "}
      {/* Opcional: tela de carregamento */}
    </AuthContext.Provider>
  );
};
