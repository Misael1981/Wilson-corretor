import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

import Tags from "./Tags"; // Assumindo que Tags é um componente existente
import PropertyTypeSelect from "./PropertyTypeSelect"; // Assumindo que PropertyTypeSelect é um componente existente
import PropertyTypeInput from "./PropertyTypeInput"; // Assumindo que PropertyTypeInput é um componente existente
import Button from "../Button"; // Assumindo que Button é um componente existente

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

const SearchField = () => {
  const navigate = useNavigate();

  // Estados para os valores dos filtros
  const [propertyType, setPropertyType] = useState(""); // Para o PropertyTypeSelect
  const [locationSearch, setLocationSearch] = useState(""); // Para o PropertyTypeInput (cidade/bairro)

  // Função para lidar com a submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Constrói os query parameters
    const queryParams = new URLSearchParams();
    if (propertyType) {
      queryParams.append("tipo", propertyType);
    }
    // Assumindo que locationSearch pode ser cidade ou bairro.
    // Você pode precisar de lógica mais sofisticada aqui se quiser separar cidade e bairro.
    if (locationSearch) {
      queryParams.append("local", locationSearch); // Ex: ?local=SaoPaulo
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
          <Tags /> {/* Onde você tem as tags de "Residencial", "Comercial" */}
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
            <Button fontSize={"1rem"} type="submit">
              {" "}
              {/* Garante que o botão seja do tipo submit */}
              Buscar
            </Button>
          </ContainerSearch>
        </FieldsetStylized>
      </FormStylized>
    </>
  );
};

export default SearchField;
