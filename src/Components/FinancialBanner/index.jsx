import styled from "styled-components";
import SubTitle from "../SubTitle";
import Button from "../Button";
import ilustrationHome from "./assets/casa-01.jpg";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const FinancialBannerStylized = styled.section`
  width: 95vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (width > 1020px) {
    width: 70rem;
    max-width: 80vw;
    flex-direction: row;
    align-items: stretch;
  }
`;

const FinancialBannerContent = styled.div`
  background: var(--degrade-blue);
  color: #ccc;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 1rem 1rem 0 0;

  h3 {
    font-weight: 600;
    font-size: 1.3rem;
  }
  @media screen and (width > 1020px) {
    border-radius: 1rem 0 0 1rem;
  }
`;

const FinancialBannerImage = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 100%;

    @media screen and (width > 1020px) {
      object-fit: cover;
      object-position: 40% 50%;
      border-radius: 0 1rem 1rem 0;
    }
  }
`;

const ListFinancial = styled.ul`
  margin-bottom: 1rem;
  li {
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  li svg {
    margin: 0 0.5rem;
  }
`;

const FinancialBanner = () => {
  return (
    <FinancialBannerStylized>
      <FinancialBannerContent>
        <SubTitle>Fale Conosco</SubTitle>
        <h3>Nós podemos te ajudar a transformar seu sonho em realidade</h3>
        <ListFinancial>
          <li>
            <IoCheckmarkDoneSharp color="#d6b689" />
            Simule um financiamento para a compra do seu imóvel com as taxas
            mais baixas do mercado.
          </li>
          <li>
            <IoCheckmarkDoneSharp color="#d6b689" />
            Um de nossos agentes irá te orientar durante todo o processo, desde
            a documentação inicial, encaminhamento para a instituição
            financeira, até as chaves do seu imóvel.
          </li>
          <li>
            <IoCheckmarkDoneSharp color="#d6b689" />
            Entre em contato, e veja que o sonho é possível!
          </li>
        </ListFinancial>
        <Button isGolden={true}>Falar com um agente</Button>
      </FinancialBannerContent>
      <FinancialBannerImage>
        <img src={ilustrationHome} alt="" />
      </FinancialBannerImage>
    </FinancialBannerStylized>
  );
};

export default FinancialBanner;
