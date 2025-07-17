import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";

const BackButtonStyled = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: var(--color-blue);
`;

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <BackButtonStyled onClick={() => navigate(-1)}>
      <FaArrowLeft />
      Voltar
    </BackButtonStyled>
  );
};

export default BackButton;
