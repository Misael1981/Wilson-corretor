import { CiFilter } from "react-icons/ci";
import styled from "styled-components";

const ButtonFilterStylized = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  background: var(--degrade-blue);
  color: var(--color-golden);
  border-color: var(--color-golden);
  margin: 0 auto;
`;

const ButtonFilter = () => {
  return (
    <ButtonFilterStylized>
      <CiFilter />
      Filtros
    </ButtonFilterStylized>
  );
};

export default ButtonFilter;
