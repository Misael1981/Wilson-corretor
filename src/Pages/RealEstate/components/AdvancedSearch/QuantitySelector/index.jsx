// src/Components/QuantitySelector/index.jsx
import React from "react";
import styled from "styled-components";

// 1. Contêiner para o grupo de botões
const SelectorGroup = styled.div`
  display: flex;
  gap: 8px; /* Espaçamento entre os botões */
  margin-bottom: 1rem;
`;

// 2. Estilo do botão de seleção
// O segredo é ter um estilo padrão e um estilo para quando ele está 'ativo'
const SelectorButton = styled.button`
  background-color: ${(props) =>
    props.$isActive ? "var(--color-blue)" : "white"};
  color: ${(props) => (props.isActive ? "white" : "var(--color-blue)")};
  border: 1px solid var(--color-blue);
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  min-width: 40px; /* Garante tamanho mínimo */
  text-align: center;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.isActive ? "var(--color-blue-dark)" : "var(--color-blue-light)"};
  }
`;

// 3. O Componente React
const QuantitySelector = ({ label, options, selectedValue, onSelect }) => {
  return (
    <fieldset>
      {" "}
      {/* Usar fieldset para agrupar semanticamente */}
      <legend>{label}</legend>{" "}
      {/* Título do grupo (Quartos, Banheiros, Vagas) */}
      <SelectorGroup>
        {options.map((option) => (
          <SelectorButton
            key={option.value} // Use o valor como key
            $isActive={selectedValue === option.value} // Verifica se é o selecionado
            onClick={() => onSelect(option.value)} // Chama a função onSelect com o valor
          >
            {option.label}
          </SelectorButton>
        ))}
      </SelectorGroup>
    </fieldset>
  );
};

export default QuantitySelector;
