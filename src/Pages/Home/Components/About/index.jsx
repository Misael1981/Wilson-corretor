import styled from "styled-components";
import PhotoWilson from "./assets/foto-wilson.jpg";
import Title from "../../../../Components/Title";
import Button from "../../../../Components/Button";
import SubTitle from "../../../../Components/SubTitle";

const AboutStylized = styled.section`
  width: 95vw;
  background: var(--degrade-golden);
  min-height: 50vh;
  margin: 2rem auto;
  box-sizing: border-box;
  border-radius: 1rem;
  padding: 2rem 0 0;

  @media screen and (width > 1020px) {
    width: 70rem;
    max-width: 80vw;
  }
`;

const AboutContainer = styled.div`
  @media screen and (width > 1020px) {
    width: 70rem;
    margin: 0 auto;
    display: flex;
    align-items: stretch;
  }
`;

const AboutImageStylized = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.85) 0px 5px 15px;
  }

  @media screen and (width > 1020px) {
    max-height: 30rem;
    flex: 1;
  }
`;

const AboutContent = styled.div`
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.5;

  @media screen and (width > 1020px) {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

const ContainerSubTitle = styled.div`
  background-color: var(--color-blue);
  padding: 1rem;
  border-radius: 1rem;
`;

const About = () => {
  return (
    <AboutStylized>
      <Title>Um pouco sobre Wilson Santiago</Title>
      <AboutContainer>
        <AboutImageStylized>
          <img src={PhotoWilson} alt="Foto de Wilson Santiago" />
        </AboutImageStylized>
        <AboutContent>
          <ContainerSubTitle>
            <SubTitle>Saiba quem é o corretor</SubTitle>
          </ContainerSubTitle>
          <p>
            Atuante como corretor de destaque na Essenza Imobiliária, Wilson
            Santiago é formado em Transações Imobiliárias pelo Instituto de
            Ensino Star Brasil. Pai do Lucas e da Mariana e casado com sua
            esposa, Wilson iniciou sua carreira profissional na indústria, onde
            tem o Bacharelado de Gestão de Produção Industrial, embora também
            tenha obtido sucesso na área, Wilson resolveu migrar pra uma área
            onde pudesse, de forma direta, ajudar o próximo a realizar seus
            sonhos. Foi então que Wilson começou a atuar como corretor
            imobiliário.
          </p>
          <div>
            <Button>Fale com Wilson</Button>
          </div>
        </AboutContent>
      </AboutContainer>
    </AboutStylized>
  );
};

export default About;
