import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.js";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useAuth } from "../../../context/AuthContext.jsx";

const AuthStatusContainer = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const LoginButtonStyled = styled(Link)`
  text-decoration: none;
  color: var(--color-golden, #f39c12);
  font-size: 1.5rem;

  button {
    cursor: pointer;
    background: var(
      --degrade-golden,
      linear-gradient(to right, #f39c12, #e67e22)
    );
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.5rem;
    font-size: 1rem;
    border: 0;
    border-radius: 0.3rem;
    color: var(--color-blue, #0f1e2e);
    transition: background-color 0.3s ease;
    &:hover {
      opacity: 0.7;
    }

    svg {
      font-size: 1.5rem;
    }
  }
`;

const UserNameDisplay = styled.div`
  color: #fff;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  cursor: default;
`;

const AdminButtonStyled = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const LogoutButtonStyled = styled.button`
  background: none;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const AuthButton = () => {
  const { currentUser, userData, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Usuário deslogado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  if (loading) {
    return <p style={{ color: "#fff" }}>Carregando...</p>;
  }

  if (currentUser) {
    return (
      <AuthStatusContainer to={"/admin"}>
        {userData && userData.role === "admin" ? (
          <AdminButtonStyled to="/admin-dashboard">
            Olá, {userData.name ? userData.name.split(" ")[0] : "Admin"}!
            (Admin)
          </AdminButtonStyled>
        ) : (
          <UserNameDisplay>
            Olá, {userData ? userData.name.split(" ")[0] : "Usuário"}!
          </UserNameDisplay>
        )}
        <LogoutButtonStyled onClick={handleLogout}>Sair</LogoutButtonStyled>
      </AuthStatusContainer>
    );
  }

  return (
    <LoginButtonStyled to="/login">
      <button>
        <IoPersonCircleSharp />
        Entrar
      </button>
    </LoginButtonStyled>
  );
};

export default AuthButton;
