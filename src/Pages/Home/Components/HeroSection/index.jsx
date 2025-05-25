import styled from "styled-components";
import LogoVertical from "/img/logo-vertical.svg";
import SearchField from "../../../../Components/SearchField";

const HeroSectionStylized = styled.section`
  width: 100%;
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
  box-shadow: rgba(0, 0, 0, 1) 0px 25px 20px -20px;
  border-radius: 0 0 5rem 5rem;
  box-sizing: border-box;
  z-index: 10;

  img {
    display: block;
    margin: 0 auto;
    width: 70vw;
    height: auto;
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
  padding-bottom: 0.5rem;
`;

const HeroTitleStylized = styled.h1`
  display: block;
  margin-top: 6rem;
  color: var(--color-blue);
  font-family: var(--font-special);
  font-weight: 700;
  font-size: 2rem;
  padding: 2rem;
`;

const HeroSection = () => {
  return (
    <HeroSectionStylized>
      <HeroImage>
        <img src={LogoVertical} alt="" />
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
