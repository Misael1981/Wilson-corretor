import styled from "styled-components";
import { HiBellAlert } from "react-icons/hi2";

const PropertyActionsStylized = styled.div`
  width: 100%;
  max-width: 95vw;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonAlert = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-blue);
  font-size: 1.2rem;
  border: none;
`;

const SelectPageStylized = styled.select`
  border: none;
  color: var(--color-blue);
  font-size: 1.2rem;
  background-color: transparent;
  outline-color: var(--color-golden);
`;

const PropertyActions = () => {
  return (
    <PropertyActionsStylized>
      <ButtonAlert>
        <HiBellAlert />
        Criar Alerta
      </ButtonAlert>
      <div>
        <SelectPageStylized name="filtro-relevante">
          <option>Selecione uma:</option>
          <optgroup label="Filtro mais relevante">
            <option value="mais-relevantes">Mais relevantes</option>
            <option value="mais-recente">Mais recente</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-area">Maior área</option>
          </optgroup>
        </SelectPageStylized>
      </div>
    </PropertyActionsStylized>
  );
};

export default PropertyActions;
