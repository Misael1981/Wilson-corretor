import { useState } from "react";
import styled from "styled-components";
import QuantitySelector from "./QuantitySelector";
import Button from "../../../../Components/Button";

const AdvancedSearchTitleStylized = styled.div`
  width: 90%;
  padding: 1rem;
  text-align: center;
  /* background-color: var(--color-golden); */
  color: var(--color-blue);
  /* Removido position: sticky e top aqui, pois será controlado pelo pai ou media query */

  h2 {
    margin: 0;
  }
`;

const FormAdvancedStylized = styled.form`
  /* Estilos padrão para o formulário */
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-blue);
  margin: 0;

  /* Estilos para a barra de rolagem (WebKit) */
  /* ... (seus estilos de scrollbar aqui, como os que fizemos para aparecer no hover) ... */
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

  /* Hover para mostrar a barra de rolagem */
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: var(--color-blue-ligth);
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
  }

  /* Transições para suavizar */
  transition: overflow-y 0.3s ease-in-out;
  &::-webkit-scrollbar-thumb {
    transition: background 0.3s ease-in-out;
  }
  &::-webkit-scrollbar-track {
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

// Altere para aceitar a prop 'isOpen' (que virá do isMobileFilterOpen)
const AdvancedSearchStylized = styled.aside`
  /*
    Estilos padrão (para mobile)
    Por padrão, estará escondido, a menos que a prop 'isOpen' seja verdadeira.
    Quando 'isOpen' for true, ele será um modal/overlay.
  */
  display: none; // Escondido por padrão em mobile
  ${({ isOpen }) =>
    isOpen &&
    `
    display: flex; /* Mude para 'flex' ou 'block' para o modal */
    flex-direction: column; /* Para organizar o conteúdo do modal */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* Overlay escuro */
    z-index: 1000; /* Garante que fique por cima de tudo */
    align-items: center; /* Centraliza verticalmente */
    justify-content: center; /* Centraliza horizontalmente */

    /* Estilo do conteúdo do modal (o box branco com os filtros) */
    & > ${FormAdvancedStylized} { /* Aponta para o styled component do formulário dentro dele */
      background-color: white; /* Fundo branco do modal */
      width: 90%; /* Largura do modal */
      max-width: 500px; /* Largura máxima */
      height: 90vh; /* Altura do modal */
      overflow-y: auto; /* Altura máxima */
      -webkit-overflow-scrolling: touch;
      border-radius: 0 0 1rem 1rem;
      box-sizing: border-box;
      padding: 1rem;
      /* Remove sticky, top, height, overflow-y daqui para mobile */
      /* Já que ele será o conteúdo dentro do overlay */
      position: relative; /* Para posicionar o botão de fechar */
    }

    /* Estilo do título do modal */
    & > ${AdvancedSearchTitleStylized} {
        position: relative; /* Ou relative, dependendo da sua barra de título no modal */
        top: 0;
        left: 0;
        width: 90%;
        box-sizing: border-box;
        background-color: var(--color-golden);
        color: var(--color-blue);
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        z-index: 1001; /* Garante que o título fique por cima do overlay */
    }

  `}

  /*
    Estilos para Desktop (> 1020px)
    Estes estilos SOBRESCREVEM os estilos mobile.
    A propriedade display: block aqui garante que ele SEMPRE será visível no desktop.
  */
  @media screen and (width > 1020px) {
    display: flex; /* Ou 'block', se não for um flex container principal */
    flex-direction: column; /* Para empilhar título e formulário */
    width: 25rem;
    border-right: 1px solid var(--color-blue-ligth);
    box-sizing: border-box;
    position: sticky; /* O aside principal é sticky */
    top: 6rem; /* Gruda abaixo do header */
    height: calc(100vh - 6rem); /* Ocupa o restante da viewport */

    /* Remove estilos de overlay de mobile aqui */
    background-color: transparent; /* Não tem overlay em desktop */
    z-index: auto;
    left: auto;
    right: auto;
    justify-content: flex-start; /* Alinhamento para desktop */
    align-items: flex-start;

    /* Garante que o Formulário e Título tenham seus estilos de desktop normais */

    & > ${AdvancedSearchTitleStylized} {
      position: sticky; /* O título pode ser sticky dentro do aside */
      top: 0; /* Gruda no topo do aside */
      background-color: var(--color-golden);
      color: var(--color-blue);
      border-radius: 0; /* Remove borda arredondada de modal */
    }

    & > ${FormAdvancedStylized} {
      position: relative; /* Reset para o normal */
      background-color: transparent; /* Sem fundo branco de modal */
      width: auto; /* Sem largura fixa de modal */
      max-width: none;
      height: auto; /* Sem altura fixa de modal */
      max-height: none;
      overflow-y: auto; /* Aqui sim o scroll interno */
      flex-grow: 1; /* Para ocupar o espaço restante */
    }
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const AdvancedSearch = ({ isMobileFilterOpen, onClose }) => {
  // Estados para cada tipo de quantidade
  const [selectedBedrooms, setSelectedBedrooms] = useState(null); // ou ''
  const [selectedBathrooms, setSelectedBathrooms] = useState(null);
  const [selectedParkingSpaces, setSelectedParkingSpaces] = useState(null);

  // Opções para cada seletor
  const bedroomOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4+", value: 4 }, // Use 4 para representar 4 ou mais
  ];
  const bathroomOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4+", value: 4 },
  ];
  const parkingOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4+", value: 4 },
  ];
  return (
    <AdvancedSearchStylized isOpen={isMobileFilterOpen}>
      <AdvancedSearchTitleStylized>
        <h2>Buscas Avançadas</h2>
        {/* Botão de fechar visível APENAS em mobile quando o modal está aberto */}
        {isMobileFilterOpen && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            X
          </button>
        )}
      </AdvancedSearchTitleStylized>
      <FormAdvancedStylized action="">
        <fieldset>
          <legend>Tipos de imóveis</legend>

          <select name="" id="">
            <option value="">Selecione uma:</option>
            <optgroup>
              <option value="">Casas</option>
              <option value="">Terrenos para Construção</option>
              <option value="">Imóveis Comerciais</option>
              <option value="">Chácaras/Sítios</option>
              <option value="">Apartamento</option>
              <option value="">Imóvel na planta</option>
            </optgroup>
          </select>
        </fieldset>
        <fieldset>
          <legend>Cidade</legend>
          <input type="text" />
        </fieldset>
        <fieldset>
          <legend>Faixa de preço</legend>
          <label htmlFor="">
            Preço mínimo
            <input type="number" name="" id="" />
          </label>
          <label htmlFor="">
            Preço máximo
            <input type="number" name="" id="" />
          </label>
        </fieldset>
        <fieldset>
          <legend>Área do Imóvel</legend>
          <label htmlFor="">
            Mínimo
            <input type="number" name="" id="" />
          </label>
          <label htmlFor="">
            Máximo
            <input type="number" name="" id="" />
          </label>
        </fieldset>
        <QuantitySelector
          label="Quartos"
          options={bedroomOptions}
          selectedValue={selectedBedrooms}
          onSelect={setSelectedBedrooms} // A função que atualiza o estado
        />

        <QuantitySelector
          label="Banheiros"
          options={bathroomOptions}
          selectedValue={selectedBathrooms}
          onSelect={setSelectedBathrooms}
        />

        <QuantitySelector
          label="Vagas"
          options={parkingOptions}
          selectedValue={selectedParkingSpaces}
          onSelect={setSelectedParkingSpaces}
        />
        <ContainerButtons>
          <Button>Limpar</Button>
          <Button>Buscar</Button>
        </ContainerButtons>
      </FormAdvancedStylized>
    </AdvancedSearchStylized>
  );
};

export default AdvancedSearch;
