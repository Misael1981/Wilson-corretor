import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import styled from "styled-components"; // <--- Importe styled-components

// 1. Crie um contêiner para o carrossel principal e o de thumbs
const CarouselContainer = styled.div`
  max-width: 800px; /* Largura máxima do carrossel */
  margin: 0 auto 2rem auto; /* Centraliza e adiciona margem inferior */
  padding: 1rem; /* Adiciona um padding interno */
  background-color: #504f4f; /* Fundo leve para destacar */
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  /* Você pode usar isso para estilizar elementos dentro do Swiper,
     como os botões de navegação, caso queira sobrescrever o padrão
     que vem do swiper/css/navigation. Por exemplo:
     .swiper-button-next,
     .swiper-button-prev {
       color: var(--color-blue) !important;
     }
  */
`;

// 2. Estilize o Swiper principal (mySwiper2)
const StyledMainSwiper = styled(Swiper)`
  height: 80%; /* Do seu CSS original */
  width: 100%; /* Do seu CSS original */
  /* As variáveis CSS podem ser passadas via style prop ou aqui, se preferir */

  .swiper-slide {
    background-size: cover;
    background-position: center;
    /* Styles do swiper-slide genérico */
    text-align: center;
    font-size: 18px;
    background: #444; /* Cor de fundo do slide */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 3. Estilize o Swiper de thumbs (mySwiper)
const StyledThumbsSwiper = styled(Swiper)`
  height: 20%; /* Do seu CSS original */
  box-sizing: border-box;
  padding: 10px 0; /* Do seu CSS original */

  .swiper-slide {
    width: 25%; /* Do seu CSS original */
    height: 100%; /* Do seu CSS original */
    opacity: 0.4; /* Do seu CSS original */
  }

  .swiper-slide-thumb-active {
    opacity: 1; /* Do seu CSS original */
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PropertyCarousel = ({ images }) => {
  // <--- Receba as imagens como prop
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Fallback para imagens se a prop 'images' for vazia ou nula
  const defaultImages = [
    "https://placehold.co/800x400/E0E0E0/333333?text=IMAGEM+1",
    "https://placehold.co/800x400/E0E0E0/333333?text=IMAGEM+2",
    "https://placehold.co/800x400/E0E0E0/333333?text=IMAGEM+3",
    "https://placehold.co/800x400/E0E0E0/333333?text=IMAGEM+4",
  ];
  const imagesToDisplay = images && images.length > 0 ? images : defaultImages;

  return (
    <CarouselContainer>
      {" "}
      {/* Use o contêiner geral */}
      <StyledMainSwiper
        // As variáveis CSS podem ser passadas diretamente aqui
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        // Removido className="mySwiper2" - os estilos já estão no StyledMainSwiper
      >
        {imagesToDisplay.map((image, index) => (
          <SwiperSlide key={index}>
            {" "}
            {/* Use um key único */}
            <img src={image} alt={`Imóvel - ${index}`} />
          </SwiperSlide>
        ))}
      </StyledMainSwiper>
      <StyledThumbsSwiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        // Removido className="mySwiper" - os estilos já estão no StyledThumbsSwiper
      >
        {imagesToDisplay.map((image, index) => (
          <SwiperSlide key={index}>
            {" "}
            {/* Use um key único */}
            <img src={image} alt={`Thumbnail - ${index}`} />
          </SwiperSlide>
        ))}
      </StyledThumbsSwiper>
    </CarouselContainer>
  );
};

export default PropertyCarousel;
