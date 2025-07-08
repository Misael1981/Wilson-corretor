import { IoSearchSharp } from "react-icons/io5";
import styled from "styled-components";

const ContainerInputStylized = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: var(--color-blue);
  padding: 0.5rem;
  border: 1px solid var(--color-blue);
  border-radius: 0.5rem;

  input {
    border: none;
    width: 100%;
    outline: none;
    background-color: transparent;
  }
`;

const InputPages = () => {
  return (
    <ContainerInputStylized>
      <IoSearchSharp />
      <input type="text" placeholder="Digite o bairro ou cidade" />
    </ContainerInputStylized>
  );
};

export default InputPages;
