import React, { useState } from "react";
import styled from "styled-components";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/autoplay";

// import required modules
import {
  Pagination,
  Navigation,
  Autoplay,
  FreeMode,
  Thumbs,
} from "swiper/modules";

const PropertyImageContainer = styled.div`
  width: 100%;
  border-radius: 0.8rem;
  margin-bottom: 1.5rem;
  overflow: hidden;

  .swiper-slide img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 0.8rem;
  }

  .mySwiperThumbs .swiper-slide {
    width: 24% !important;
    height: 120px;
    opacity: 0.4;
    cursor: pointer;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .mySwiperThumbs .swiper-slide-thumb-active {
    opacity: 1;
    border: 2px solid var(--color-golden);
  }
`;

const PropertyCarousel = ({ imageUrls }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <PropertyImageContainer>
      <Swiper
        style={{
          "--swiper-navigation-color": "var(--color-golden)",
          "--swiper-pagination-color": "var(--color-golden)",
        }}
        spaceBetween={10}
        navigation={true}
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination, Autoplay]}
        className="mySwiper2"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {imageUrls && imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <img src={url} alt={`Imagem ${index + 1} do imóvel`} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              src="https://placehold.co/800x400/cccccc/333333?text=Sem+Imagem"
              alt="Sem imagem disponível"
            />
          </SwiperSlide>
        )}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperThumbs"
        style={{ marginTop: "10px" }}
      >
        {imageUrls && imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <img src={url} alt={`Miniatura ${index + 1}`} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              src="https://placehold.co/100x80/cccccc/333333?text=Sem+Imagem"
              alt="Miniatura sem imagem"
            />
          </SwiperSlide>
        )}
      </Swiper>
    </PropertyImageContainer>
  );
};

export default PropertyCarousel;
