import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

import Tags from "./Tags"; // Assumindo que Tags é um componente existente
import PropertyTypeSelect from "./PropertyTypeSelect"; // Assumindo que PropertyTypeSelect é um componente existente
import PropertyTypeInput from "./PropertyTypeInput"; // Assumindo que PropertyTypeInput é um componente existente
// import Button from "../Button"; // Removido para usar button nativo

const FormStylized = styled.form`
  width: 100%;
`;

const FieldsetStylized = styled.fieldset`
  border: none;
  max-width: 80%;
  margin: 0 auto;
`;

const ContainerSearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 0;

  @media screen and (min-width: 1020px) {
    /* Corrigido para min-width */
    flex-direction: row;
    align-items: flex-end; /* Alinha os itens ao final */
  }
`;

const SearchButton = styled.button`
  flex: 1;
  background: var(--degrade-blue);
  color: var(--color-golden);
  font-size: 1rem;
  font-weight: 700;
  padding: 0.8rem;
  cursor: pointer;
  border: none;
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(1.1);
  }
`;

const SearchField = () => {
  const navigate = useNavigate();

  // Estados para os valores dos filtros
  const [propertyType, setPropertyType] = useState(""); // Para o PropertyTypeSelect
  const [locationSearch, setLocationSearch] = useState(""); // Para o PropertyTypeInput (cidade/bairro)
  const [selectedCategory, setSelectedCategory] = useState(""); // Para as Tags de categoria

  // Função para lidar com a submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Constrói os query parameters
    const queryParams = new URLSearchParams();
    if (selectedCategory) {
      queryParams.append("categoria", selectedCategory);
    }
    if (propertyType) {
      queryParams.append("tipo", propertyType);
    }
    if (locationSearch) {
      queryParams.append("local", locationSearch);
    }

    // Redireciona para a página de imóveis com os filtros como query params
    navigate(`/imoveis?${queryParams.toString()}`);
  };

  return (
    <>
      <FormStylized onSubmit={handleSubmit}>
        {" "}
        {/* Conecta o onSubmit */}
        <FieldsetStylized>
          <Tags 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          <ContainerSearch>
            {/* Passa as props para PropertyTypeSelect */}
            <PropertyTypeSelect
              selectedValue={propertyType}
              onSelect={setPropertyType}
            />
            {/* Passa as props para PropertyTypeInput */}
            <PropertyTypeInput
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
            />
            <SearchButton type="submit" aria-label="Buscar imóveis">
              Buscar
            </SearchButton>
          </ContainerSearch>
        </FieldsetStylized>
      </FormStylized>
    </>
  );
};

export default SearchField;
