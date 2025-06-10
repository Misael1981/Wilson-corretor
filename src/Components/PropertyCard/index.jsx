// src/Components/PropertyCard/index.jsx (CÓDIGO CORRIGIDO)
import React from "react"; // Sempre bom importar React
import styled from "styled-components";

// Icones
import { FaChartArea, FaShower } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { FaCarRear } from "react-icons/fa6";
import Button from "../../Components/Button";

// Seus estilos para o card individual (reutilizando os que te passei antes)
const CardStylized = styled.div`
  background: var(--degrade-blue);
  color: #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
  @media screen and (width > 820px) {
    height: 320px;
    flex-direction: row;
    max-width: 820px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: 100%;
  object-fit: cover;
  display: block;

  @media screen and (width > 820px) {
    height: 400px;
  }
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
`;

const CardHeader = styled.header`
  font-family: var(--font-title);
  h3 {
    font-size: 1.3rem;
    margin: 0 0 0.3rem;
    text-align: center;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
      margin: 0;
      font-size: 1rem;
    }
  }
`;

const CardPropertyPriceAndFavorite = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  color: var(--color-golden);

  button {
    background: transparent;
    border: none;
    color: var(--color-golden);
  }
`;

const CardPropertyDescriptionList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const CardTitle = styled.h3`
  font-family: var(--font-title);
  font-size: 1.3rem;
  color: var(--color-blue);
  margin: 0;
`;

const CardPrice = styled.p`
  font-family: var(--font-text);
  font-size: 1.1rem;
  color: var(--color-golden);
  font-weight: bold;
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 0.8rem;
  margin: 0;
`;

const ButtonMoreDetails = styled.div`
  width: 100%;
  display: flex;
`;

const CardPropertyFooter = styled.footer`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PropertyCard = ({ propertyData }) => {
  console.log("Do card", propertyData);
  if (!propertyData) {
    return <div>Dados do imóvel não disponíveis. </div>;
  }

  return (
    <CardStylized>
      <CardImage src={propertyData.image} alt={propertyData.title} />
      <CardContent>
        <CardHeader>
          <h3>{propertyData.title}</h3>
          <div>
            <h4>{propertyData.city}</h4>
            <h4>{propertyData.location}</h4>
          </div>
        </CardHeader>
        <CardPropertyPriceAndFavorite>
          <strong id="preco">{propertyData.price}</strong>
          <button>
            <GoHeart />
          </button>
        </CardPropertyPriceAndFavorite>
        <CardPropertyDescriptionList>
          <li>
            <FaChartArea />
            <span>{propertyData.area}&sup2;</span>
          </li>
          <li>
            <LuBedDouble />
            <span>{propertyData.bedrooms}</span>
          </li>
          <li>
            <FaShower />
            <span>{propertyData.bathrooms}</span>
          </li>
          <li>
            <FaCarRear />
            <span>{propertyData.parkingSpaces}</span>
          </li>
        </CardPropertyDescriptionList>
        <CardDescription>{propertyData.description}</CardDescription>
        <ButtonMoreDetails>
          <Button>Mais Detalhes</Button>
        </ButtonMoreDetails>
        <CardPropertyFooter>
          <Button isGolden={true}>Mensagem</Button>
          <Button>Ligar</Button>
        </CardPropertyFooter>
      </CardContent>
    </CardStylized>
  );
};

export default PropertyCard;
