import styled from "styled-components";
import LogoVertical from "/img/logo-vertical.svg";
import SearchField from "../SearchField";

const HeroSectionStylized = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (width > 1020px) {
    background-color: var(--color-golden);
    flex-direction: row;
    height: 45vh;
  }
`;

const HeroImage = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem 0 2rem;
  background: linear-gradient(
    170deg,
    rgba(15, 27, 41, 1) 0%,
    rgba(44, 72, 102, 1) 48%,
    #041120 100%
  );
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border-radius: 0 0 5rem 5rem;
  box-sizing: border-box;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    margin: 0 auto;
    width: 70vw;
    height: auto;
    max-height: 40vh;
    transition: all 0.3s ease;
  }

  @media screen and (width > 1020px) {
    max-width: 30%;
    border-radius: 0 5rem 5rem 0;
    box-shadow: rgba(0, 0, 0, 1) 0px 20px 30px -10px;
    margin-top: 2rem;
    height: 45vh;

    img {
      width: auto;
      max-width: 90%;
    }
  }
`;

const HeroContent = styled.div`
  position: relative;
  background-color: var(--color-golden);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -5rem;
  z-index: 1;
  text-align: center;
  padding: 0 0 0.8rem;
  transition: all 0.3s ease;

  @media screen and (width > 1020px) {
    margin-top: 0;
    box-sizing: border-box;
    flex: 1;
  }
`;

const HeroTitleStylized = styled.h1`
  display: block;
  margin-top: 6rem;
  color: var(--color-blue);
  font-family: var(--font-special);
  font-weight: 700;
  font-size: 2rem;
  padding: 2rem;

  @media screen and (width > 1020px) {
    font-size: 2.5rem;
    margin-top: 0.8rem;
  }
`;

/**
 * Componente HeroSection - Seção principal da página inicial
 * Exibe o logo, título principal e campo de busca
 */
const HeroSection = () => {
  return (
    <HeroSectionStylized id="hero-section">
      <HeroImage>
        <img src={LogoVertical} alt="Logo Wilson Santiago Corretor" />
      </HeroImage>
      <HeroContent>
        <HeroTitleStylized>
          Aqui é onde você pode encontrar o imóvel do seu sonho
        </HeroTitleStylized>
        <SearchField />
      </HeroContent>
    </HeroSectionStylized>
  );
};

export default HeroSection;
