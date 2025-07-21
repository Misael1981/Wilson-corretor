import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"; // Adicionado updateDoc
import { db, auth } from "@/firebase"; // Assumindo que firebase.js exporta 'db' e 'auth'
import { getAuth, deleteUser } from "firebase/auth"; // Importe deleteUser do firebase/auth

// Styled Components para o layout da página de Usuários
const UsersPageContainer = styled.div`
  padding: 1.5rem;
  background-color: #fff; /* Fundo branco para o conteúdo da página */
  border-radius: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Sombra suave */
`;

// Cabeçalho da página (título)
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
`;

// Título da página
const PageTitle = styled.h1`
  color: #333;
  font-size: 2rem;
  margin: 0;
`;

// Estilos para a tabela de usuários
const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse; /* Remove espaçamento entre as bordas das células */
  margin-top: 1.5rem;
`;

// Cabeçalho da tabela
const TableHeader = styled.thead`
  background-color: #f0f0f0;
  th {
    padding: 1rem;
    text-align: left;
    color: #555;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
  }
`;

// Corpo da tabela
const TableBody = styled.tbody`
  tr {
    &:nth-child(even) {
      /* Estilo para linhas pares */
      background-color: #f9f9f9;
    }
    &:hover {
      /* Estilo de hover para as linhas */
      background-color: #f0f5ff; /* Um azul bem suave no hover */
    }
  }
`;

// Linha da tabela
const TableRow = styled.tr`
  td {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    color: #444;
  }
`;

// Container para os botões de ação na tabela
const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

// Botão de ação (Editar/Excluir/Mudar Papel)
const ActionButton = styled.button`
  background-color: ${(props) => {
    if (props.primary) return "var(--color-blue, #0f1e2e)"; // Editar
    if (props.danger) return "#dc3545"; // Excluir
    if (props.secondary) return "#28a745"; // Mudar Papel (verde)
    return "#6c757d"; // Padrão
  }};
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) => {
      if (props.primary) return "var(--color-dark-blue, #0a141f)";
      if (props.danger) return "#c82333";
      if (props.secondary) return "#218838";
      return "#5a6268";
    }};
    transform: translateY(-1px);
  }
`;

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os usuários do Firestore
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersCollectionRef = collection(db, "users"); // Referência à coleção 'users'
      const querySnapshot = await getDocs(usersCollectionRef);

      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(fetchedUsers);
      console.log("Usuários carregados:", fetchedUsers); // Para depuração
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError("Não foi possível carregar os usuários. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com a edição de um usuário (apenas loga por enquanto)
  const handleEdit = (userId) => {
    console.log(`Editar usuário com ID: ${userId}`);
    // Implementar navegação para a página de edição de usuário: navigate(`/admin/usuarios/editar/${userId}`);
    // Ou abrir um modal para edição rápida
  };

  // Função para alternar o papel do usuário (admin/client)
  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "client" : "admin";
    if (
      window.confirm(
        `Tem certeza que deseja mudar o papel deste usuário para ${newRole}?`
      )
    ) {
      try {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, { role: newRole });

        // Atualiza o estado local para refletir a mudança
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
        console.log(
          `Papel do usuário ${userId} alterado para ${newRole} com sucesso!`
        );
      } catch (err) {
        console.error("Erro ao mudar o papel do usuário:", err);
        setError("Não foi possível mudar o papel do usuário. Tente novamente.");
      }
    }
  };

  // Função para lidar com a exclusão de um usuário
  const handleDelete = async (userId, userEmail) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o usuário ${userEmail}? Esta ação é irreversível.`
      )
    ) {
      try {
        // 1. Excluir o documento do usuário no Firestore
        await deleteDoc(doc(db, "users", userId));
        console.log(`Documento do usuário ${userId} excluído do Firestore.`);

        // 2. Excluir a conta de autenticação do Firebase (requer Admin SDK no backend, ou Cloud Functions)
        // A exclusão direta de um usuário *autenticado* no frontend é complexa e requer que o usuário esteja logado recentemente.
        // Para administradores, a forma mais segura e robusta é usar o Firebase Admin SDK em um ambiente de backend (Cloud Functions, Node.js, etc.).
        // Por enquanto, vamos simular a exclusão da conta de autenticação ou deixar um aviso.

        // Se você tentar excluir a conta do usuário *logado atualmente* a partir do frontend:
        // const userToDelete = auth.currentUser;
        // if (userToDelete && userToDelete.uid === userId) {
        //   await deleteUser(userToDelete);
        //   console.log("Conta de autenticação do usuário logado excluída.");
        // } else {
        //   console.warn("Para excluir a conta de autenticação de outro usuário, é necessário o Firebase Admin SDK (backend).");
        // }
        // Para fins de demonstração no frontend, vamos apenas remover do estado e do Firestore.

        setUsers(users.filter((user) => user.id !== userId)); // Remove da lista local
        console.log(`Usuário ${userId} excluído com sucesso!`);
      } catch (err) {
        console.error("Erro ao excluir usuário:", err);
        setError("Não foi possível excluir o usuário. Tente novamente.");
      }
    }
  };

  // Carrega os usuários quando o componente é montado
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <UsersPageContainer>
        <p>Carregando usuários...</p>
      </UsersPageContainer>
    );
  }

  if (error) {
    return (
      <UsersPageContainer>
        <p style={{ color: "red" }}>{error}</p>
      </UsersPageContainer>
    );
  }

  return (
    <UsersPageContainer>
      <PageHeader>
        <PageTitle>Gerenciar Usuários</PageTitle>
        {/* Opcional: Botão para adicionar novo usuário manualmente (raro em admin, mas possível) */}
        {/* <NewUserButton to="/admin/usuarios/criar">+ Novo Usuário</NewUserButton> */}
      </PageHeader>

      <UsersTable>
        <TableHeader>
          <TableRow>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Papel</th>
            <th>Telefone</th>
            <th>Data de Cadastro</th>
            <th>Ações</th>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <td>
                  {user.name || "N/A"} {user.lastName || ""}
                </td>
                <td>{user.email || "N/A"}</td>
                <td>{user.role || "client"}</td>
                <td>{user.phoneNumber || "N/A"}</td>
                <td>
                  {user.createdAt
                    ? new Date(
                        user.createdAt.seconds * 1000
                      ).toLocaleDateString("pt-BR")
                    : "N/A"}
                </td>
                <td>
                  <ActionsContainer>
                    <ActionButton primary onClick={() => handleEdit(user.id)}>
                      Editar
                    </ActionButton>
                    <ActionButton
                      secondary
                      onClick={() => handleToggleRole(user.id, user.role)}
                    >
                      {user.role === "admin"
                        ? "Tornar Cliente"
                        : "Tornar Admin"}
                    </ActionButton>
                    <ActionButton
                      danger
                      onClick={() => handleDelete(user.id, user.email)}
                    >
                      Excluir
                    </ActionButton>
                  </ActionsContainer>
                </td>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>
                Nenhum usuário encontrado.
              </td>
            </TableRow>
          )}
        </TableBody>
      </UsersTable>
    </UsersPageContainer>
  );
};

export default UsersAdmin;
