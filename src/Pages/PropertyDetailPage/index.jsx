import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import HeaderPages from "../RealEstate/components/HeaderPages";
import Footer from "../../Components/Footer";
import PropertyCarousel from "./components/PropertyCarousel";
import RecentlyAdded from "./components/RecentlyAdded";
import Breadcrumbs from "../../Components/Breadcrumbs";

const DetailPageContainer = styled.div`
  width: 95vw;
  max-width: 85rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 2rem 0;

  @media screen and (width > 1120px) {
    flex-direction: row;
  }
`;

const DetailMainContainer = styled.div`
  padding: 2rem;
  width: 80vw;
  max-width: 50rem;
  margin: 0 auto;
  background: var(--degrade-blue);
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
`;

const PropertyImage = styled.div`
  width: 100%;
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
  const { id } = useParams();
  const {
    data: allProperties,
    isLoading,
    error,
  } = useFetch("/propertiesRealEstate.json");

  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (allProperties) {
      const foundProperty = allProperties.find((p) => String(p.id) === id);
      setProperty(foundProperty);
    }
  }, [allProperties, id]);

  if (isLoading) return <p>Carregando detalhes do imóvel...</p>;
  if (error) return <p>Erro ao carregar imóvel: {error.message}</p>;
  if (!property) return <p>Imóvel não encontrado.</p>;

  return (
    <>
      <HeaderPages />
      <Breadcrumbs />
      <DetailPageContainer>
        <DetailMainContainer>
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
        </DetailMainContainer>
        <RecentlyAdded />
      </DetailPageContainer>
      <Footer />
    </>
  );
};

export default PropertyDetailPage;
