import styled from "styled-components";
import logo from "/img/logo-horizontal.svg";
import Button from "../../Components/Button";
import BackButton from "../../Components/BackButton";
import Divisor from "../../Components/Divisor";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const LoginContainer = styled.main`
  width: 35rem;
  max-width: 95vw;
  margin: 2rem auto;
  box-sizing: border-box;
  padding-bottom: 1rem;
  border: 1px solid var(--color-blue, #3498db);
  border-radius: 0.5rem;
  overflow: hidden;
`;

const HeaderLogin = styled.header`
  background-color: var(--color-blue, #3498db); /* Adicione um fallback */
  border-radius: 0.5rem 0.5rem 0 0;
  width: 100%;
  padding: 1rem 0;
  text-align: center; /* Centraliza a imagem */

  img {
    display: block;
    width: 8rem;
    margin: 0 auto;
    height: auto; /* Garante proporção */
  }
`;

const LoginDescription = styled.section`
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  color: #313030;
  font-size: 0.95rem;
  text-align: center;
  margin-bottom: 1rem;

  a {
    text-decoration: none;
    color: #00548b;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FormLogin = styled.form`
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-size: 0.95rem;
    color: #313030;
    font-weight: 500;
  }
  input {
    outline: none;
    box-sizing: border-box;
    padding: 0.75rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    &:focus {
      border-color: var(--color-blue, #3498db);
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
  }
`;

const FooterLogin = styled.footer`
  text-align: center;
  color: #313030;
  font-size: 0.9rem;

  p {
    margin: 0;
    margin-top: 0.5rem;
  }

  a {
    text-decoration: none;
    color: #00548b;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.85rem;
  text-align: center;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        lastName: name,
        email: email,
        phoneNumber: phone,
        role: "client",
        createdAt: new Date(),
      });

      console.log(
        "Usuário cadastrado com sucesso e dados salvos no Firestore!"
      );
      navigate("/", { replace: true });
    } catch (error) {
      let errorMessage = "Ocorreu um erro desconhecido. Tente novamente.";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "Este e-mail já está em uso. Tente outro ou faça login.";
          break;
        case "auth/invalid-email":
          errorMessage = "O formato do e-mail é inválido.";
          break;
        case "auth/weak-password":
          errorMessage = "A senha deve ter pelo menos 6 caracteres.";
          break;
        case "auth/operation-not-allowed":
          errorMessage =
            "O método de login por e-mail/senha não está habilitado. Contate o suporte.";
          break;
        default:
          errorMessage = `Erro no cadastro: ${error.message}`;
      }
      setError(errorMessage);
      console.error("Erro ao fazer o cadastro:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const ErrorMessage = styled.p`
    color: red;
    font-size: 0.85rem;
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  `;

  return (
    <>
      <BackButton />
      <LoginContainer>
        <HeaderLogin>
          <img
            src={logo}
            alt="Logo do Wilson Santiago Imóveis"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/128x32/CCCCCC/000000?text=Logo";
            }}
          />
        </HeaderLogin>
        <LoginDescription>
          <p>
            Ao continuar, você aceita os <a href="#">Termos de uso</a> e{" "}
            <a href="#">Política de privacidade</a>, acorda em receber
            comunicações de Wilson Santiago Imóveis, afirma ter mais de 18 anos
            e permite o compartilhamento de seus dados nas interações com a
            plataforma.
          </p>
        </LoginDescription>
        <FormLogin onSubmit={handleRegister}>
          <Button
            type="button"
            ariaLabel={"Entrar com sua conta Google"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <FcGoogle size={24} />
            Entrar com Google
          </Button>
          <Divisor>Preencha o formulário</Divisor>
          {error && <ErrorMessage role="alert">{error}</ErrorMessage>}{" "}
          {/* Exibe a mensagem de erro */}
          <InputGroup>
            <label htmlFor="name-login">Nome e sobrenome</label>
            <input
              type="text"
              id="name-login"
              name="name-login"
              placeholder="Digite seu nome completo"
              required
              aria-required="true"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="phone-login">Telefone</label>
            <input
              type="tel"
              id="phone-login"
              name="phone-login"
              placeholder="Digite seu telefone"
              required
              aria-required="true"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="email-login">E-mail</label>
            <input
              type="email"
              id="email-login"
              name="email-login"
              placeholder="seuemail@exemplo.com"
              autoComplete="email"
              required
              aria-required="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="password-login">Senha</label>
            <input
              type="password"
              id="password-login"
              name="password-login"
              placeholder="********"
              autoComplete="current-password"
              required
              aria-required="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button
            type="submit"
            disabled={isLoading}
            ariaLabel={"Entrar na sua conta"}
          >
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </FormLogin>
      </LoginContainer>
    </>
  );
};

export default Register;
