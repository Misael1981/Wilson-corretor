import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch"; // Seu hook de fetch
import HeaderPages from "../RealEstate/components/HeaderPages"; // Reutilize o header
import Footer from "../../Components/Footer"; // Reutilize o footer
import PropertyCarousel from "./components/PropertyCarousel";

// Styled Components para a página de detalhes
const DetailPageContainer = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  background: var(--degrade-blue);
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const PropertyImage = styled.div`
  width: 100%;
  /* max-height: 1200px; */
  border-radius: 0.8rem;
  margin-bottom: 1.5rem;
`;

const PropertyTitle = styled.h1`
  font-family: var(--font-title);
  color: var(--color-golden);
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const PropertySubtitle = styled.h2`
  color: var(--color-gray);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const PropertyPrice = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-golden);
  margin-bottom: 1rem;
`;

const PropertyDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  color: #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 500;
`;

const PropertyDescription = styled.p`
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 2rem;
`;

const ContactButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: var(--color-golden);
  color: var(--color-blue);
  border: none;
  border-radius: 0.8rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-golden-dark);
  }
`;

const PropertyDetailPage = () => {
  const { id } = useParams(); // Obtém o ID do imóvel da URL
  const {
    data: allProperties,
    isLoading,
    error,
  } = useFetch("/propertiesRealEstate.json"); // Busca todos os imóveis

  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (allProperties) {
      // Encontra o imóvel pelo ID (ID da URL é string, id do JSON pode ser number)
      const foundProperty = allProperties.find((p) => String(p.id) === id);
      setProperty(foundProperty);
    }
  }, [allProperties, id]); // Dependências: re-executa se allProperties ou id mudarem

  if (isLoading) return <p>Carregando detalhes do imóvel...</p>;
  if (error) return <p>Erro ao carregar imóvel: {error.message}</p>;
  if (!property) return <p>Imóvel não encontrado.</p>; // Se não encontrou o imóvel

  return (
    <>
      <HeaderPages />
      <DetailPageContainer>
        <PropertyImage>
          <PropertyCarousel images={property.images || []} />
        </PropertyImage>
        <PropertyTitle>{property.title}</PropertyTitle>
        <PropertySubtitle>
          {property.address || "Endereço não disponível"}
        </PropertySubtitle>
        <PropertyPrice>
          R${" "}
          {property.price
            ? property.price.toLocaleString("pt-BR")
            : "Preço não disponível"}
        </PropertyPrice>

        <PropertyDetailsGrid>
          <DetailItem>
            Área: {property.area ? `${property.area}m²` : "N/A"}
          </DetailItem>
          <DetailItem>Quartos: {property.bedrooms || "N/A"}</DetailItem>
          <DetailItem>Banheiros: {property.bathrooms || "N/A"}</DetailItem>
          <DetailItem>Vagas: {property.parkingSpaces || "N/A"}</DetailItem>
          <DetailItem>Tipo: {property.type || "N/A"}</DetailItem>
        </PropertyDetailsGrid>

        <PropertyDescription>
          <h3>Descrição do Imóvel:</h3>
          {property.description ||
            "Nenhuma descrição detalhada disponível para este imóvel."}
        </PropertyDescription>

        <ContactButton>Entrar em Contato</ContactButton>
        {/* Você pode adicionar mais seções aqui: mapa, galeria de fotos, etc. */}
      </DetailPageContainer>
      <Footer />
    </>
  );
};

export default PropertyDetailPage;
