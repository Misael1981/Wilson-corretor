import styled from "styled-components";
import { FaChartArea, FaShower } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { FaCarRear } from "react-icons/fa6";
import Button from "../../../Button";
import { Link } from "react-router-dom";

const CardPropertyStylized = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  background: var(--degrade-blue);
  border-radius: 1rem;
  border: 5px solid var(--color-golden);
  padding: 1rem;
`;

const CardPropertyImage = styled.div`
  width: 100%;
  height: 15rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: 1rem 1rem 0 0;
  }
`;

const CardPropertyContent = styled.div`
  color: #ccc;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardPropertyHeader = styled.header`
  h4 {
    margin: 0;
    font-size: 1.2rem;
  }
  p {
    font-size: 1rem;
    margin: 0;
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

const CardPropertyFooter = styled.footer`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LinkStylized = styled(Link)`
  display: flex;
  text-decoration: none;
`;

const CardProperty = ({ propertyData }) => {
  const {
    title,
    location,
    image,
    area,
    bedrooms,
    bathrooms,
    parkingSpaces,
    price,
  } = propertyData;
  return (
    <CardPropertyStylized>
      <CardPropertyImage>
        <img src={image} alt="Imagem placeholder de uma casa" />
      </CardPropertyImage>
      <CardPropertyContent>
        <CardPropertyHeader>
          <h4>{title}</h4>
          <p>{location}</p>
        </CardPropertyHeader>
        <CardPropertyDescriptionList>
          <li>
            <FaChartArea />
            <span>{area}&sup2;</span>
          </li>
          <li>
            <LuBedDouble />
            <span>{bedrooms}</span>
          </li>
          <li>
            <FaShower />
            <span>{bathrooms}</span>
          </li>
          <li>
            <FaCarRear />
            <span>{parkingSpaces}</span>
          </li>
        </CardPropertyDescriptionList>
        <CardPropertyPriceAndFavorite>
          <strong id="preco">{price}</strong>
          <button>
            <GoHeart />
          </button>
        </CardPropertyPriceAndFavorite>
        <LinkStylized to={`/imovel/${propertyData.id}`}>
          <Button
            background={"var(--degrade-golden)"}
            color={"var(--color-blue)"}
          >
            Mais Detalhes
          </Button>
        </LinkStylized>
        <CardPropertyFooter>
          <Button background={"var(--degrade-whatsapp)"} color={"#ccc"}>
            Mensagem
          </Button>
          <Button>Ligar</Button>
        </CardPropertyFooter>
      </CardPropertyContent>
    </CardPropertyStylized>
  );
};

export default CardProperty;
