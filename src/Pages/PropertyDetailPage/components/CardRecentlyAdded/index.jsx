import { FaChartArea, FaBed, FaBath } from "react-icons/fa"; // Adicionei FaBed e FaBath
import { Link } from "react-router-dom";

import {
  CardRecentlyAddedStylized,
  ImageCardRecentlyAddedContainer,
  ContentCardRecentlyAdded,
  CardContent,
} from "./CardRecentlyAddedStyles"; // Importa os estilos

const CardRecentlyAdded = ({ propertyData }) => {
  const formatPrice = (price) => {
    if (price === undefined || price === null) return "Preço não disponível";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const defaultImageUrl =
    "https://placehold.co/100x80/cccccc/333333?text=Sem+Imagem"; // Imagem padrão

  return (
    <Link to={`/imovel/${propertyData.id}`} style={{ textDecoration: "none" }}>
      {" "}
      {/* Remove sublinhado do link */}
      <CardRecentlyAddedStylized>
        <h3>{propertyData.title || "Título Indisponível"}</h3>
        <CardContent>
          <ImageCardRecentlyAddedContainer>
            <img
              src={
                propertyData.imageUrls && propertyData.imageUrls.length > 0
                  ? propertyData.imageUrls[0]
                  : defaultImageUrl
              }
              alt={propertyData.title || "Imóvel"}
            />
          </ImageCardRecentlyAddedContainer>
          <ContentCardRecentlyAdded>
            <ul>
              <li>
                <FaChartArea />
                <span>
                  {propertyData.area ? `${propertyData.area} m²` : "N/A"}
                </span>
              </li>
              <li>
                <FaBed />
                <span>{propertyData.bedrooms || "N/A"}</span>
              </li>
              <li>
                <FaBath />
                <span>{propertyData.bathrooms || "N/A"}</span>
              </li>
            </ul>
            <p>{formatPrice(propertyData.price)}</p>
          </ContentCardRecentlyAdded>
        </CardContent>
      </CardRecentlyAddedStylized>
    </Link>
  );
};

export default CardRecentlyAdded;
