import { IoPersonOutline } from "react-icons/io5";
import styled from "styled-components";

const ButtonLoginStylized = styled.button`
  background-color: transparent;
  color: var(--color-golden);
  font-size: 1rem;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Login = () => {
  return (
    <ButtonLoginStylized>
      <IoPersonOutline />
      Entrar
    </ButtonLoginStylized>
  );
};

export default Login;
