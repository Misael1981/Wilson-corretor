import styled from "styled-components";
import partner from "./assets/imagem_anuncie-imovel.webp";
import SubTitle from "../SubTitle";
import Button from "../Button";

const WorkWithUsStylized = styled.section`
  width: 95vw;
  min-height: 30vh;
  margin: 2rem auto;
  background: var(--degrade-golden);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media screen and (width > 1020px) {
    flex-direction: row;
  }
`;

const WorkWithUsStylizedImagem = styled.div`
  flex: 1;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 1rem;

  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const WorkWithUsStylizedContent = styled.div`
  flex: 2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h5 {
    font-size: 2rem;
    color: var(--color-blue);
    margin: 2rem 0;
    font-family: var(--font-title);
  }
`;

const WorkWithUsStylizedTitle = styled.div`
  background-color: var(--color-blue);
  padding: 1rem;
  border-radius: 1rem;
`;

const WorkWithUs = () => {
  return (
    <WorkWithUsStylized>
      <WorkWithUsStylizedImagem>
        <img
          src={partner}
          alt="Imagem de uma maquete de uma casa com um aperto de mãos."
        />
      </WorkWithUsStylizedImagem>
      <WorkWithUsStylizedContent>
        <WorkWithUsStylizedTitle>
          <SubTitle>Corretores e proprietários de imóveis</SubTitle>
        </WorkWithUsStylizedTitle>
        <div>
          <h5>
            Receba mais contatos divulgando os seus imóveis no portal
            imobiliário pioneiro da região
          </h5>
        </div>
        <div>
          <Button>Anunciar Imóvel</Button>
        </div>
      </WorkWithUsStylizedContent>
    </WorkWithUsStylized>
  );
};

export default WorkWithUs;
