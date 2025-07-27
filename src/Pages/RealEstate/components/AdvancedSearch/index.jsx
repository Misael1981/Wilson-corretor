// Sidebar de Pesquisa

import React, { useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import QuantitySelector from "./QuantitySelector";
import Button from "../../../../Components/Button";

const AdvancedSearchTitleStylized = styled.div`
  width: 90%;
  box-sizing: border-box;
  padding: 1rem;
  text-align: center;
  color: var(--color-blue);
  position: relative;

  h2 {
    margin: 0;
  }
`;

const FormAdvancedStylized = styled.form`
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-blue);
  margin: 0;

  &::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 10px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background: var(--color-blue-ligth);
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
  }

  transition: overflow-y 0.3s ease-in-out;
  &::-webkit-scrollbar-thumb {
    transition: background 0.3s ease-in-out;
  }
  &-::-webkit-scrollbar-track {
    transition: background 0.3s ease-in-out;
  }

  fieldset,
  input,
  label,
  select {
    display: block;
    margin: 0;
    padding: 0.3rem;
    border: 1px solid var(--color-blue-ligth);
    border-radius: 0.5rem;
    font-size: 1rem;
    background-color: transparent;
  }
  fieldset {
    padding: 0.5rem;
  }
  legend {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-blue);
  }
  label {
    margin-bottom: 0.5rem;
  }
`;

const AdvancedSearchStylized = styled.aside`
  display: none;
  ${({ $isOpen }) =>
    $isOpen &&
    `
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* Overlay escuro */
    z-index: 1000;
    align-items: center;
    justify-content: center;

    & > ${FormAdvancedStylized} {
      background-color: white;
      width: 90%;
      max-width: 500px;
      height: 90vh;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      border-radius: 0 0 1rem 1rem;
      box-sizing: border-box;
      padding: 1rem;
      position: relative;
    }

    & > ${AdvancedSearchTitleStylized} {
      position: relative;
      top: 0;
      left: 0;
      width: 90%;
      max-width: 500px; /* Alinha com a largura do formulário */
      box-sizing: border-box;
      background-color: var(--color-golden);
      color: var(--color-blue);
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      z-index: 1001;
    }
  `}

  @media screen and (min-width: 1020px) {
    display: flex;
    flex-direction: column;
    width: 25rem;
    border-right: 1px solid var(--color-blue-ligth);
    box-sizing: border-box;
    position: sticky;
    top: 5rem;
    height: calc(100vh - 6rem);
    background-color: transparent;
    z-index: auto;
    left: auto;
    right: auto;
    justify-content: flex-start;
    align-items: flex-start;

    & > ${AdvancedSearchTitleStylized} {
      position: sticky;
      top: 0;
      background-color: var(--color-golden);
      color: var(--color-blue);
      border-radius: 0;
      width: 100%;
      max-width: none;
    }

    & > ${FormAdvancedStylized} {
      position: relative;
      background-color: transparent;
      width: auto;
      max-width: none;
      height: auto;
      max-height: none;
      overflow-y: auto;
      flex-grow: 1;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  z-index: 1001;

  @media screen and (min-width: 1020px) {
    display: none;
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const AdvancedSearch = ({ isMobileFilterOpen, onClose, onFilter }) => {
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    bedrooms: "",
    bathrooms: "",
    garageSpaces: "",
    city: "",
    neighborhood: "",
  });

  const bedroomOptions = [
    { label: "Qualquer", value: "" },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4+", value: 4 },
  ];
  const bathroomOptions = [
    { label: "Qualquer", value: "" },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4+", value: 4 },
  ];
  const parkingOptions = [
    { label: "Qualquer", value: "" },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4+", value: 4 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleQuantitySelect = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let q = collection(db, "properties");

    if (filters.type) {
      q = query(q, where("type", "==", filters.type.toLowerCase()));
    }
    if (filters.city) {
      q = query(q, where("city", "==", filters.city));
    }
    if (filters.neighborhood) {
      q = query(q, where("neighborhood", "==", filters.neighborhood));
    }

    if (filters.minPrice) {
      q = query(q, where("price", ">=", parseFloat(filters.minPrice)));
    }
    if (filters.maxPrice) {
      q = query(q, where("price", "<=", parseFloat(filters.maxPrice)));
    }
    if (filters.minArea) {
      q = query(q, where("area", ">=", parseFloat(filters.minArea)));
    }
    if (filters.maxArea) {
      q = query(q, where("area", "<=", parseFloat(filters.maxArea)));
    }
    if (filters.bedrooms) {
      q = query(q, where("bedrooms", ">=", parseInt(filters.bedrooms)));
    }
    if (filters.bathrooms) {
      q = query(q, where("bathrooms", ">=", parseInt(filters.bathrooms)));
    }
    if (filters.garageSpaces) {
      q = query(q, where("garageSpaces", ">=", parseInt(filters.garageSpaces)));
    }

    q = query(q, orderBy("createdAt", "desc"));

    try {
      const querySnapshot = await getDocs(q);
      const filteredProperties = [];
      querySnapshot.forEach((doc) => {
        filteredProperties.push({ id: doc.id, ...doc.data() });
      });
      onFilter(filteredProperties);
      onClose();
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
      onFilter([]);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      type: "",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
      bedrooms: "",
      bathrooms: "",
      garageSpaces: "",
      city: "",
      neighborhood: "",
    });
    onFilter(null);
    onClose();
  };

  return (
    <AdvancedSearchStylized $isOpen={isMobileFilterOpen}>
      <AdvancedSearchTitleStylized>
        <h2>Buscas Avançadas</h2>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
      </AdvancedSearchTitleStylized>
      <FormAdvancedStylized onSubmit={handleSubmit}>
        <fieldset>
          <legend>Tipos de imóveis</legend>
          <select
            name="type"
            id="type"
            value={filters.type}
            onChange={handleChange}
          >
            <option value="">Selecione um tipo</option>
            <option value="casa">Casas</option>
            <option value="apartamento">Apartamentos</option>
            <option value="loja">Imóveis Comerciais</option>
            <option value="chacara">Chácaras/Sítios</option>
            <option value="terreno">Terrenos para Construção</option>
            <option value="outros">Outros</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Cidade</legend>
          <input
            type="text"
            name="city"
            id="city"
            value={filters.city}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset>
          <legend>Bairro</legend>
          <input
            type="text"
            name="neighborhood"
            id="neighborhood"
            value={filters.neighborhood}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset>
          <legend>Faixa de preço</legend>
          <label htmlFor="minPrice">
            Preço mínimo
            <input
              type="number"
              name="minPrice"
              id="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              min="0"
            />
          </label>
          <label htmlFor="maxPrice">
            Preço máximo
            <input
              type="number"
              name="maxPrice"
              id="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              min="0"
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Área do Imóvel</legend>
          <label htmlFor="minArea">
            Mínimo
            <input
              type="number"
              name="minArea"
              id="minArea"
              value={filters.minArea}
              onChange={handleChange}
              min="0"
            />
          </label>
          <label htmlFor="maxArea">
            Máximo
            <input
              type="number"
              name="maxArea"
              id="maxArea"
              value={filters.maxArea}
              onChange={handleChange}
              min="0"
            />
          </label>
        </fieldset>

        <QuantitySelector
          label="Quartos"
          options={bedroomOptions}
          selectedValue={filters.bedrooms}
          onSelect={(value) => handleQuantitySelect("bedrooms", value)}
        />

        <QuantitySelector
          label="Banheiros"
          options={bathroomOptions}
          selectedValue={filters.bathrooms}
          onSelect={(value) => handleQuantitySelect("bathrooms", value)}
        />

        <QuantitySelector
          label="Vagas na Garagem"
          options={parkingOptions}
          selectedValue={filters.garageSpaces}
          onSelect={(value) => handleQuantitySelect("garageSpaces", value)}
        />

        <ContainerButtons>
          <Button
            type="button"
            onClick={handleClearFilters}
            background={"gray"}
          >
            Limpar
          </Button>
          <Button
            type="submit"
            background={"var(--color-golden)"}
            color={"white"}
          >
            Buscar
          </Button>
        </ContainerButtons>
      </FormAdvancedStylized>
    </AdvancedSearchStylized>
  );
};

export default AdvancedSearch;
