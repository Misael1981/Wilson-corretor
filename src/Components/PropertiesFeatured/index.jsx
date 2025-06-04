import styled from "styled-components";
import Title from "../Title";
import CardProperty from "./Components/CardProperty";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"; // Se for usar pagination (bolinhas)
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

const PropertiesFeaturedStylized = styled.section`
  width: 95vw;
  min-height: 50vh;
  margin: 2rem auto 20rem;
`;

const ContainerCards = styled.div``;

const PropertiesFeatured = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/propertiesRealEstate.json")
      .then((response) => {
        if (!response.ok) {
          // Verifica se a resposta foi bem-sucedida (status 200-299)
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(setData)
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setError(err); // Armazena o erro no estado
      })
      .finally(() => {
        setIsLoading(false); // Finaliza o loading, independente de sucesso ou erro
      });
  }, []);

  if (isLoading) return <p>Carregando imóveis...</p>; // Mensagem de loading
  if (error) return <p>Erro ao carregar imóveis: {error.message}</p>; // Mensagem de erro
  if (!data.length) return <p>Nenhum imóvel encontrado.</p>;

  return (
    <PropertiesFeaturedStylized>
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
          // >>> Configuração de Breakpoints para Responsividade <<<
          breakpoints={{
            768: {
              slidesPerView: 2,
              slidesPerGroup: 1,
            },

            1024: {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
            1224: {
              slidesPerView: 4,
              slidesPerGroup: 1,
            },

            1440: {
              slidesPerView: 5,
              slidesPerGroup: 1,
            },
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {data.map((property) => (
            <SwiperSlide key={property.id}>
              <CardProperty propertyData={property} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ContainerCards>
    </PropertiesFeaturedStylized>
  );
};

export default PropertiesFeatured;
