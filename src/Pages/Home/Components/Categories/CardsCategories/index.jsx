import imageCasa from "../assets/casa-02.jpg";
import imageApartamento from "../assets/apartamento-01.png";
import imageChacara from "../assets/chacara-01.png";
import imageLoja from "../assets/loja.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const categoryBackgrounds = {
  casa: imageCasa,
  apartamento: imageApartamento,
  chacara: imageChacara,
  loja: imageLoja,
};

const CardCategoryStylized = styled(Link)`
  text-decoration: none;
  width: 15rem;
  height: 12rem;
  background-image: linear-gradient(
      rgba(15, 27, 41, 0.4),
      rgba(15, 27, 41, 0.4)
    ),
    ${(props) => `url(${categoryBackgrounds[props.categoryType]})`};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  text-align: center;
`;

const CardsCategories = ({ categoryType, title }) => {
  const toPath = `/imoveis/${categoryType}`;
  return (
    <CardCategoryStylized to={toPath} categoryType={categoryType}>
      <h3>{title}</h3>
    </CardCategoryStylized>
  );
};

export default CardsCategories;
