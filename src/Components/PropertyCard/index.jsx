// src/Components/PropertyCard/index.jsx (CÓDIGO CORRIGIDO)
import React from "react"; // Sempre bom importar React
import styled from "styled-components";

// Icones
import { FaChartArea, FaShower } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { FaCarRear } from "react-icons/fa6";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

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

const LinkStyled = styled(Link)`
  text-decoration: none;
`;

const PropertyCard = ({ propertyData }) => {
  const {
    id,
    title,
    neighborhood,
    city,
    imageUrls,
    area,
    bedrooms,
    bathrooms,
    garageSpaces,
    price,
    ownerPhone,
    projectCode,
  } = propertyData;

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "Preço não disponível";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleMessageClick = () => {
    const defaultPhoneNumber = "5535999415176";
    const targetPhoneNumber = ownerPhone || defaultPhoneNumber;
    const message = `Olá, tenho interesse no imóvel "${title}" (Código do Projeto: ${
      projectCode || "N/A"
    }). Poderia me dar mais informações?`;
    const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCallClick = () => {
    const defaultPhoneNumber = "5535999415176";
    const targetPhoneNumber = ownerPhone || defaultPhoneNumber;
    window.open(`tel:${targetPhoneNumber}`);
  };

  return (
    <CardStylized>
      <CardImage
        src={
          imageUrls && imageUrls.length > 0
            ? imageUrls[0]
            : "https://placehold.co/300x150/cccccc/333333?text=Sem+Imagem"
        }
        alt={title || "Imagem do imóvel"}
      />
      <CardContent>
        <CardHeader>
          <h3>{title}</h3>
          <div>
            <h4>{city}</h4>
            <h4>{neighborhood}</h4>
          </div>
        </CardHeader>
        <CardPropertyPriceAndFavorite>
          <strong id="preco">{formatPrice(price)}</strong>
          <button>
            <GoHeart />
          </button>
        </CardPropertyPriceAndFavorite>
        <CardPropertyDescriptionList>
          <li>
            <FaChartArea />
            <span>{String(area ?? 0)}&sup2;</span>
          </li>
          <li>
            <LuBedDouble />
            <span>{String(bedrooms ?? 0)}</span>
          </li>
          <li>
            <FaShower />
            <span>{String(bathrooms ?? 0)}</span>
          </li>
          <li>
            <FaCarRear />
            <span>{String(garageSpaces ?? 0)}</span>
          </li>
        </CardPropertyDescriptionList>
        {/* <CardDescription>{description}</CardDescription> */}
        <ButtonMoreDetails>
          <LinkStyled to={`/imovel/${id}`}>
            <Button>Mais Detalhes</Button>
          </LinkStyled>
        </ButtonMoreDetails>
        <CardPropertyFooter>
          <Button isGolden={true} onClick={handleMessageClick}>
            Mensagem
          </Button>
          <Button onClick={handleCallClick}>Ligar</Button>
        </CardPropertyFooter>
      </CardContent>
    </CardStylized>
  );
};

export default PropertyCard;
