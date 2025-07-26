import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

import Footer from "../../Components/Footer";
import Breadcrumbs from "../../Components/Breadcrumbs";
import RecentlyAdded from "./components/RecentlyAdded";
import PropertyCarousel from "./components/PropertyCarousel";

import {
  DetailPageContainer,
  DetailMainContainer,
  PropertyTitle,
  PropertySubtitle,
  PropertyPrice,
  PropertyDetailsGrid,
  DetailItem,
  PropertyDescription,
  ContactButton,
} from "./PropertyDetailStyles";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setError(new Error("ID do imóvel não encontrado na URL."));
        setIsLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError(new Error("Imóvel não encontrado."));
        }
      } catch (err) {
        console.error("Erro ao buscar imóvel:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "Preço não disponível";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleContactClick = () => {
    const defaultPhoneNumber = "5535999415176";
    const targetPhoneNumber = property.ownerPhone || defaultPhoneNumber;
    const message = `Olá, tenho interesse no imóvel "${
      property.title
    }" (Código do Projeto: ${
      property.projectCode || "N/A"
    }). Poderia me dar mais informações?`;
    const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (isLoading)
    return (
      <DetailPageContainer>
        <DetailMainContainer>
          <p>Carregando detalhes do imóvel...</p>
        </DetailMainContainer>
      </DetailPageContainer>
    );
  if (error)
    return (
      <DetailPageContainer>
        <DetailMainContainer>
          <p>Erro ao carregar imóvel: {error.message}</p>
        </DetailMainContainer>
      </DetailPageContainer>
    );
  if (!property)
    return (
      <DetailPageContainer>
        <DetailMainContainer>
          <p>Imóvel não encontrado.</p>
        </DetailMainContainer>
      </DetailPageContainer>
    );

  return (
    <>
      <Breadcrumbs />
      <DetailPageContainer>
        <DetailMainContainer>
          {/* Usando o novo componente PropertyCarousel */}
          <PropertyCarousel imageUrls={property.imageUrls} />

          <PropertyTitle>{property.title}</PropertyTitle>
          <PropertySubtitle>
            {property.neighborhood}, {property.city} - {property.state}
            {property.projectCode && ` (Cód: ${property.projectCode})`}
          </PropertySubtitle>
          <PropertyPrice>{formatPrice(property.price)}</PropertyPrice>
          <PropertyDetailsGrid>
            <DetailItem>
              Área: {property.area ? `${property.area}m²` : "N/A"}
            </DetailItem>
            <DetailItem>Quartos: {property.bedrooms || "N/A"}</DetailItem>
            <DetailItem>Banheiros: {property.bathrooms || "N/A"}</DetailItem>
            <DetailItem>
              Vagas Garagem:{" "}
              {property.garageSpaces !== undefined && property.garageSpaces > 0
                ? property.garageSpaces
                : "N/A"}
            </DetailItem>
            <DetailItem>Tipo: {property.type || "N/A"}</DetailItem>
            <DetailItem>Status: {property.status || "N/A"}</DetailItem>
          </PropertyDetailsGrid>
          <PropertyDescription>
            <h3>Descrição do Imóvel:</h3>
            {property.description ||
              "Nenhuma descrição detalhada disponível para este imóvel."}
          </PropertyDescription>
          <ContactButton onClick={handleContactClick}>
            Entrar em Contato (WhatsApp)
          </ContactButton>
        </DetailMainContainer>
        <RecentlyAdded />
      </DetailPageContainer>
      <Footer />
    </>
  );
};

export default PropertyDetailPage;
