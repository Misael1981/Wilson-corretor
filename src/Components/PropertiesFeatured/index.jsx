import styled from "styled-components";

// Importando Componentes
import Title from "../Title";

// Import do HOOK
import useFetch from "../../hooks/useFetch";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import CardProperty from "./Components/CardProperty";
import ButtonAllProperties from "../../Components/ButtonAllProperties";

const PropertiesFeaturedStylized = styled.section`
  width: 95vw;
  min-height: 50vh;
  margin: 2rem auto;
`;

const ContainerCards = styled.div`
  margin-bottom: 1rem;
`;

const PropertiesFeatured = () => {
  // Use seu hook personalizado para buscar os dados
  const { data, isLoading, error } = useFetch("/propertiesRealEstate.json");

  if (isLoading) return <p>Carregando imóveis...</p>;
  if (error) return <p>Erro ao carregar imóveis: {error.message}</p>;
  if (!data || !data.length) return <p>Nenhum imóvel encontrado.</p>; // Ajuste para !data ou !data.length

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
          {data.map((property) => (
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
