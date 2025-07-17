import { Link } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import styled from "styled-components";

const LinkLogin = styled(Link)`
  text-decoration: none;
  color: var(--color-golden);
  font-size: 1.5rem;

  button {
    cursor: pointer;
    background: var(--degrade-golden);
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.5rem;
    font-size: 1rem;
    border: 0;
    border-radius: 0.3rem;
    color: var(--color-blue);

    svg {
      font-size: 1.5rem;
    }
  }
`;

const ButtonLogin = () => {
  return (
    <LinkLogin to={"/login"}>
      <button>
        <IoPersonCircleSharp />
        Entrar
      </button>
    </LinkLogin>
  );
};

export default ButtonLogin;
