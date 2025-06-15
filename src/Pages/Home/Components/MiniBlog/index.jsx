import styled from "styled-components";
import Title from "../../../../Components/Title";
import financialImage from "./assets/financing.jpg";
import empreendimentos from "./assets/empreendimentos.jpg";
import manutencao from "./assets/manutencao.jpg";
import vendas from "./assets/vendas.jpg";
import { Link } from "react-router-dom";

const MiniBlogStylized = styled.section`
  width: 100%;
  max-width: 95vw;
  height: auto;
  margin: 2rem auto;
`;

const SubTitleBlog = styled.h6`
  text-align: center;
  font-size: 1.5rem;
  max-width: 80vw;
  margin: 0 auto;
  color: var(--color-blue);
`;

const ContainerBlogs = styled.div`
  width: 100%;
  max-width: 75rem;
  box-sizing: border-box;
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
`;

const ContainerFinancial = styled.div`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
`;

const OpportunitiesStylized = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ContainerMaintenance = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const Blog = styled(Link)`
  flex: 1;
  width: 20rem;
  max-width: 90vw;
  min-height: 15rem;
  padding: 1rem;
  border: 1px solid var(--color-golden);
  border-radius: 1rem;
  background-image: linear-gradient(
      rgba(15, 27, 41, 0.4),
      rgba(15, 27, 41, 0.4)
    ),
    url(${(props) => props.backgroundImageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  transition: transform 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1.5rem;
  }
  h4 {
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }
`;

const MiniBlog = () => {
  const financialData = {
    id: "1",
    image: financialImage,
    title: "Financiamento",
    description:
      "Artigo com dicas e informações sobre financiamento de imóveis.",
  };

  const venturesData = {
    id: "2",
    image: empreendimentos,
    title: "Empreendimentos",
    description: "Descubra novas oportunidades de investimento em imóveis.",
  };

  const maintenanceData = {
    id: "3",
    image: manutencao,
    title: "Manutenção",
    description: "Dicas essenciais para cuidar e valorizar seu patrimônio.",
  };

  const salesData = {
    id: "4",
    image: vendas,
    title: "Vendas",
    description: "O guia completo para vender seu imóvel de forma eficiente.",
  };
  return (
    <MiniBlogStylized>
      <div>
        <Title>Explore</Title>
        <SubTitleBlog>
          Uma seleção de conteúdos que simplificam sua jornada de compra, venda
          ou manutenção dos seus imóveis
        </SubTitleBlog>
      </div>
      <ContainerBlogs>
        <ContainerFinancial>
          <Blog
            to={`/blog/${venturesData.id}`}
            key={financialData.id}
            backgroundImageUrl={financialData.image}
          >
            <h3>{financialData.title}</h3>
            <h4>{financialData.description}</h4>
          </Blog>
          <OpportunitiesStylized>
            <Blog
              to={`/blog/${venturesData.id}`}
              key={venturesData.id}
              backgroundImageUrl={venturesData.image}
            >
              <h3>{venturesData.title}</h3>
              <h4>{venturesData.description}</h4>
            </Blog>
            <Blog
              to={`/blog/${venturesData.id}`}
              key={salesData.id}
              backgroundImageUrl={salesData.image}
            >
              <h3>{salesData.title}</h3>
              <h4>{salesData.description}</h4>
            </Blog>
          </OpportunitiesStylized>
        </ContainerFinancial>
        <ContainerMaintenance>
          <Blog
            to={`/blog/${venturesData.id}`}
            key={maintenanceData.id}
            backgroundImageUrl={maintenanceData.image}
          >
            <h3>{maintenanceData.title}</h3>
            <h4>{maintenanceData.description}</h4>
          </Blog>
        </ContainerMaintenance>
      </ContainerBlogs>
    </MiniBlogStylized>
  );
};

export default MiniBlog;
