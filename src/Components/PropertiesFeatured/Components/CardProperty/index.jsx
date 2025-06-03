import styled from "styled-components";
import CasaUm from "../assets/casa-01.jpg";
import { FaChartArea, FaShower } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { FaCarRear } from "react-icons/fa6";
import Button from "../../../Button";

const CardPropertyStylized = styled.div`
  box-sizing: border-box;
  width: 20rem;
  max-width: 90vw;
  height: auto;
  min-height: 5rem;
  background: var(--degrade-blue);
  border-radius: 1rem;
  border: 5px solid var(--color-golden);
  padding: 1rem;
`;

const CardPropertyImage = styled.div`
  width: 100%;

  img {
    width: 100%;
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

const CardProperty = () => {
  return (
    <CardPropertyStylized>
      <CardPropertyImage>
        <img src={CasaUm} alt="Imagem placeholder de uma casa" />
      </CardPropertyImage>
      <CardPropertyContent>
        <CardPropertyHeader>
          <h4>Casa semi-nova</h4>
          <p>Bairro Nome do Bairro</p>
        </CardPropertyHeader>
        <CardPropertyDescriptionList>
          <li>
            <FaChartArea />
            <span>250 m&sup2;</span>
          </li>
          <li>
            <LuBedDouble />
            <span>2</span>
          </li>
          <li>
            <FaShower />
            <span>1</span>
          </li>
          <li>
            <FaCarRear />
            <span>1</span>
          </li>
        </CardPropertyDescriptionList>
        <CardPropertyPriceAndFavorite>
          <strong class="preco">R$ 128.455</strong>
          <button>
            <GoHeart />
          </button>
        </CardPropertyPriceAndFavorite>
        <CardPropertyFooter>
          <Button isGolden={true}>Mensagem</Button>
          <Button>Ligar</Button>
        </CardPropertyFooter>
      </CardPropertyContent>
    </CardPropertyStylized>
  );
};

export default CardProperty;
