import styled from "styled-components";
import { FaChartArea, FaShower } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { FaCarRear } from "react-icons/fa6";
import Button from "../../../Button"; // Ajuste o caminho se necessário
import { Link } from "react-router-dom";

const CardPropertyStylized = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  background: var(--degrade-blue);
  border-radius: 1rem;
  border: 5px solid var(--color-golden);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardPropertyImage = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;

  img {
    width: 100%;
    height: 12rem;
    object-fit: cover;
    border-radius: 1rem 1rem 0 0;
  }
`;

const CardPropertyContent = styled.div`
  color: #ccc;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardPropertyHeader = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  h4 {
    margin: 0;
    font-size: 1rem;
    color: var(--color-golden);
    text-align: center;
  }
  p {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    margin: 0;
  }
`;

const CardPropertyDescriptionList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  padding: 0; /* Remove padding padrão da lista */
  margin: 0; /* Remove margin padrão da lista */

  li {
    list-style: none; /* Remove bullet points */
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
    cursor: pointer; /* Adiciona cursor de ponteiro */
    font-size: 1.8rem; /* Aumenta o tamanho do ícone de coração */
    transition: transform 0.2s ease-in-out; /* Adiciona transição */

    &:hover {
      transform: scale(1.1); /* Efeito de zoom no hover */
    }
  }
`;

const CardPropertyFooter = styled.footer`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LinkStylized = styled(Link)`
  display: flex;
  text-decoration: none;
  width: 100%; /* Garante que o link ocupe toda a largura do botão */
`;

const CardProperty = ({ propertyData }) => {
  const {
    title,
    neighborhood,
    city,
    imageUrls,
    area,
    bedrooms,
    bathrooms,
    garageSpaces,
    price,
    ownerPhone, // Destrutura ownerPhone
    projectCode, // Destrutura projectCode
  } = propertyData;

  // Função para formatar o preço para BRL
  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Função para lidar com o clique no botão "Mensagem" (WhatsApp)
  const handleMessageClick = () => {
    const defaultPhoneNumber = "5535999415176"; // Número padrão da imobiliária
    const targetPhoneNumber = ownerPhone || defaultPhoneNumber; // Usa o do imóvel ou o padrão
    const message = `Olá, tenho interesse no imóvel "${title}" (Código do Projeto: ${
      projectCode || "N/A"
    }). Poderia me dar mais informações?`;
    const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Função para lidar com o clique no botão "Ligar"
  const handleCallClick = () => {
    const defaultPhoneNumber = "5535999415176"; // Número padrão da imobiliária
    const targetPhoneNumber = ownerPhone || defaultPhoneNumber; // Usa o do imóvel ou o padrão
    window.open(`tel:${targetPhoneNumber}`);
  };

  return (
    <CardPropertyStylized>
      <CardPropertyImage>
        {/* Acessa o primeiro elemento do array imageUrls */}
        <img
          src={
            imageUrls && imageUrls.length > 0
              ? imageUrls[0]
              : "https://placehold.co/400x200/cccccc/333333?text=Sem+Imagem"
          }
          alt={title || "Imagem do imóvel"}
        />
      </CardPropertyImage>
      <CardPropertyContent>
        <CardPropertyHeader>
          <h4>{title}</h4>
          <p>
            {neighborhood} - {city}
          </p>
        </CardPropertyHeader>
        <CardPropertyDescriptionList>
          {area && (
            <li>
              <FaChartArea />
              <span>{area}m&sup2;</span>
            </li>
          )}
          {bedrooms && (
            <li>
              <LuBedDouble />
              <span>{bedrooms}</span>
            </li>
          )}
          {bathrooms && (
            <li>
              <FaShower />
              <span>{bathrooms}</span>
            </li>
          )}
          {garageSpaces !== undefined &&
            garageSpaces > 0 && ( // Verifica se existe e é maior que 0
              <li>
                <FaCarRear />
                <span>{garageSpaces}</span>
              </li>
            )}
        </CardPropertyDescriptionList>
        <CardPropertyPriceAndFavorite>
          <strong id="preco">{formatPrice(price)}</strong>
          <button aria-label="Adicionar aos favoritos">
            <GoHeart />
          </button>
        </CardPropertyPriceAndFavorite>
        <LinkStylized to={`/imovel/${propertyData.id}`}>
          {/* Removido onClick={handleDetailsClick} do Button */}
          <Button
            background={"var(--degrade-golden)"}
            color={"var(--color-blue)"}
          >
            Mais Detalhes
          </Button>
        </LinkStylized>
        <CardPropertyFooter>
          <Button
            onClick={handleMessageClick}
            background={"var(--degrade-whatsapp)"}
            color={"#ccc"}
          >
            Mensagem
          </Button>
          <Button onClick={handleCallClick}>Ligar</Button>
        </CardPropertyFooter>
      </CardPropertyContent>
    </CardPropertyStylized>
  );
};

export default CardProperty;
