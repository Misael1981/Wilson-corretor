import styled from "styled-components";
import logo from "/img/logo-horizontal.svg";
import Button from "../../Components/Button";
import Divisor from "../../Components/Divisor";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import BackButton from "../../Components/BackButton";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.main`
  width: 35rem;
  max-width: 95vw;
  margin: 2rem auto;
  box-sizing: border-box;
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleEmailLogin(e) {
    e.preventDefault();
    setError(null);

    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login efetuado com sucesso");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        setError(null);
        console.log("Erro ao fazr login " + error);
      });
  }

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
        <FormLogin onSubmit={handleEmailLogin}>
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
            <FcGoogle size={24} /> {/* Ajuste o tamanho do ícone */}
            Entrar com Google
          </Button>
          <Divisor>Ou entre com seu e-mail</Divisor>
          {error && <ErrorMessage role="alert">{error}</ErrorMessage>}{" "}
          {/* Exibe a mensagem de erro */}
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
          <Button type="submit" ariaLabel={"Entrar na sua conta"}>
            Entrar
          </Button>
          <FooterLogin>
            <a href="#">Esqueci minha senha</a>
            <p>
              Não possui uma conta?<Link to="/registro">Cadastre-se aqui</Link>
            </p>
          </FooterLogin>
        </FormLogin>
      </LoginContainer>
    </>
  );
};

export default Login;
