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
  align-items: stretch; /* Mudei para stretch para os itens dentro do flex-direction column preencherem o espaço */
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
  // Centralize os dados em um array para facilitar a gestão e mapeamento
  const blogArticlesData = [
    {
      id: "1",
      // SLUG CORRIGIDO para combinar com blogArticles.json
      slug: "as-melhores-dicas-para-comprar-seu-primeiro-imovel",
      image: financialImage,
      title: "Financiamento",
      description:
        "Artigo com dicas e informações sobre financiamento de imóveis.",
    },
    {
      id: "2",
      // SLUG CORRIGIDO para combinar com blogArticles.json
      slug: "tendencias-mercado-imobiliario-2025",
      image: empreendimentos,
      title: "Empreendimentos",
      description: "Descubra novas oportunidades de investimento em imóveis.",
    },
    {
      id: "3",
      // SLUG CORRIGIDO para combinar com blogArticles.json
      slug: "como-valorizar-seu-imovel-para-venda-rapida",
      image: manutencao,
      title: "Manutenção",
      description: "Dicas essenciais para cuidar e valorizar seu patrimônio.",
    },
    {
      id: "4",
      // SLUG CORRIGIDO para combinar com blogArticles.json
      slug: "7-segredos-manutencao-preventiva-imoveis",
      image: vendas,
      title: "Vendas",
      description: "O guia completo para vender seu imóvel de forma eficiente.",
    },
  ];

  // Agora, referencie os dados que você precisa diretamente pelo array
  // Ou mantenha as variáveis se preferir, mas use os IDs corretos nos links
  const financialData = blogArticlesData[0];
  const venturesData = blogArticlesData[1];
  const maintenanceData = blogArticlesData[2];
  const salesData = blogArticlesData[3];

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
          {/* Card de Financiamento */}
          <Blog
            // CORRIGIDO: O link agora usa o ID/Slug de financialData
            to={`/blog/${financialData.slug || financialData.id}`}
            key={financialData.id}
            backgroundImageUrl={financialData.image}
          >
            <h3>{financialData.title}</h3>
            <h4>{financialData.description}</h4>
          </Blog>
          <OpportunitiesStylized>
            {/* Card de Empreendimentos */}
            <Blog
              // CORRIGIDO: O link agora usa o ID/Slug de venturesData
              to={`/blog/${venturesData.slug || venturesData.id}`}
              key={venturesData.id}
              backgroundImageUrl={venturesData.image}
            >
              <h3>{venturesData.title}</h3>
              <h4>{venturesData.description}</h4>
            </Blog>
            {/* Card de Vendas */}
            <Blog
              // CORRIGIDO: O link agora usa o ID/Slug de salesData
              to={`/blog/${salesData.slug || salesData.id}`}
              key={salesData.id}
              backgroundImageUrl={salesData.image}
            >
              <h3>{salesData.title}</h3>
              <h4>{salesData.description}</h4>
            </Blog>
          </OpportunitiesStylized>
        </ContainerFinancial>
        <ContainerMaintenance>
          {/* Card de Manutenção */}
          <Blog
            // CORRIGIDO: O link agora usa o ID/Slug de maintenanceData
            to={`/blog/${maintenanceData.slug || maintenanceData.id}`}
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
