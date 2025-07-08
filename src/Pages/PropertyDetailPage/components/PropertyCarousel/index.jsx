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

// 1. Cria um contêiner para o carrossel principal e o de thumbs
const CarouselContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 2rem auto;
  padding: 1rem;
  background-color: #504f4f;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (width > 1024px) {
    width: 60vw;
    height: 70vh;
  }

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
  height: 80%;
  width: 100%;

  .swiper-slide {
    background-size: cover;
    background-position: center;
    text-align: center;
    background: #444;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;

  .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
    cursor: pointer;
  }

  .swiper-slide-thumb-active {
    opacity: 1;
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
      >
        {imagesToDisplay.map((image, index) => (
          <SwiperSlide key={index}>
            {" "}
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
