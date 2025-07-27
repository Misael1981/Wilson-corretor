import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Firebase
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore
import { db } from "@/firebase"; // Importa a instância do db

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import CardProperty from "./Components/CardProperty";
import Title from "../Title";
import ButtonAllProperties from "../ButtonAllProperties";

const PropertiesFeaturedStylized = styled.section`
  width: 95vw;
  min-height: 50vh;
  margin: 2rem auto;
`;

const ContainerCards = styled.div`
  margin-bottom: 1rem;
`;

const PropertiesFeatured = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        // Cria uma query para buscar imóveis na coleção 'properties' onde 'isFeatured' é true
        const q = query(
          collection(db, "properties"),
          where("isFeatured", "==", true)
        );
        const querySnapshot = await getDocs(q);
        const fetchedProperties = [];
        querySnapshot.forEach((doc) => {
          // Adiciona o ID do documento aos dados do imóvel
          fetchedProperties.push({ id: doc.id, ...doc.data() });
        });
        setProperties(fetchedProperties);
      } catch (err) {
        console.error("Erro ao buscar imóveis em destaque:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  if (isLoading) return <p>Carregando imóveis...</p>;
  if (error) return <p>Erro ao carregar imóveis: {error.message}</p>;
  if (!properties || properties.length === 0)
    return <p>Nenhum imóvel em destaque encontrado.</p>;

  return (
    <PropertiesFeaturedStylized id="properties-featured">
      <Title>Imóveis em Destaque</Title>
      <ContainerCards>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          slidesPerGroup={1}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2, slidesPerGroup: 1 },
            1024: { slidesPerView: 3, slidesPerGroup: 1 },
            1224: { slidesPerView: 4, slidesPerGroup: 1 },
            1440: { slidesPerView: 5, slidesPerGroup: 1 },
          }}
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <CardProperty propertyData={property} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ContainerCards>
      <ButtonAllProperties>Ver todos os imóveis</ButtonAllProperties>
    </PropertiesFeaturedStylized>
  );
};

export default PropertiesFeatured;
