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

const PropertiesFeaturedStylized = styled.section`
  width: 95vw;
  min-height: 50vh;
  margin: 2rem auto 20rem;
`;

const ContainerCards = styled.div``;

const PropertiesFeatured = () => {
  return (
    <PropertiesFeaturedStylized>
      <Title>Imóveis em Destaque</Title>
      <ContainerCards>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          // >>> Configuração do Autoplay <<<
          autoplay={{
            delay: 2000, // Tempo em milissegundos (2000ms = 2 segundos)
            disableOnInteraction: false, // Opcional: Para que o autoplay não pare ao interagir com o carrossel
          }}
          // >>> Configuração de Breakpoints para Responsividade <<<
          breakpoints={{
            // Quando a largura da tela for >= 768px (tablets)
            768: {
              slidesPerView: 2, // Talvez um espaçamento maior em telas maiores
            },
            // Quando a largura da tela for >= 1024px (desktops menores)
            1024: {
              slidesPerView: 3,
            },
            // Quando a largura da tela for >= 1440px (desktops grandes)
            1440: {
              slidesPerView: 4,
            },
            // Você pode adicionar mais breakpoints se precisar
            // Exemplo: 1920: { slidesPerView: 5, spaceBetween: 60, },
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <CardProperty />
          </SwiperSlide>
          <SwiperSlide>
            <CardProperty />
          </SwiperSlide>
          <SwiperSlide>
            <CardProperty />
          </SwiperSlide>
          <SwiperSlide>
            <CardProperty />
          </SwiperSlide>
          <SwiperSlide>
            <CardProperty />
          </SwiperSlide>
          <SwiperSlide>
            <CardProperty />
          </SwiperSlide>
        </Swiper>
      </ContainerCards>
    </PropertiesFeaturedStylized>
  );
};

export default PropertiesFeatured;
