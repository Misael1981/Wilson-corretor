import styled from "styled-components";
import LogoVertical from "/img/logo-vertical.svg";

const HeroSectionStylized = styled.section`
  width: 100%;
`;

const HeroImage = styled.div`
  position: relative;
  width: 100%;
  /* background: linear-gradient(to top, #0f1b29, #0f1b2933); */
  padding: 3rem 0;
  background: linear-gradient(
    170deg,
    rgba(15, 27, 41, 1) 0%,
    rgba(44, 72, 102, 1) 48%,
    #041120 100%
  );
  box-shadow: rgba(0, 0, 0, 1) 0px 25px 20px -20px;
  border-radius: 0 0 2rem 2rem;
  box-sizing: border-box;
  z-index: 10;

  img {
    display: block;
    margin: 0 auto;
    width: 50vw;
    height: auto;
  }
`;

const HeroContent = styled.div`
  position: relative;
  background-color: var(--color-golden);
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -2rem;
  z-index: 1;
`;

const HeroTitleStylized = styled.h1`
  color: var(--color-blue);
  font-family: var(--font-special);
  font-weight: 700;
  font-size: 2rem;
`;

const HeroSection = () => {
  return (
    <HeroSectionStylized>
      <HeroImage>
        <img src={LogoVertical} alt="" />
      </HeroImage>
      <HeroContent>
        <HeroTitleStylized>Aqui ficará o slogan</HeroTitleStylized>
      </HeroContent>
    </HeroSectionStylized>
  );
};

export default HeroSection;
