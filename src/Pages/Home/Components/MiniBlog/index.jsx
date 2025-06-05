import styled from "styled-components";
import Title from "../../../../Components/Title";
import financialImage from "./assets/financing.jpg";
import empreendimentos from "./assets/empreendimentos.jpg";
import manutencao from "./assets/manutencao.jpg";
import vendas from "./assets/vendas.jpg";

const MiniBlogStylized = styled.section`
  width: 95vw;
  height: auto;
  margin: 2rem auto 20rem;
`;

const ContainerBlogs = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Blog = styled.div`
  width: 20rem;
  max-width: 90vw;
  height: 15rem;
  padding: 1rem;
  border: 1px solid var(--color-blue);
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

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
  const blogCardsData = [
    {
      id: "1", // Sempre bom ter um ID único
      image: financialImage,
      title: "Financiamento",
      description:
        "Artigo com dicas e informações sobre financiamento de imóveis.",
    },
    {
      id: "2",
      image: empreendimentos,
      title: "Empreendimentos",
      description: "Descubra novas oportunidades de investimento em imóveis.",
    },
    {
      id: "3",
      image: manutencao,
      title: "Manutenção",
      description: "Dicas essenciais para cuidar e valorizar seu patrimônio.",
    },
    {
      id: "4",
      image: vendas,
      title: "Vendas",
      description: "O guia completo para vender seu imóvel de forma eficiente.",
    },
  ];
  return (
    <MiniBlogStylized>
      <div>
        <Title>
          Explore
          <h6>
            Uma seleção de conteúdos que simplificam sua jornada de compra,
            venda ou manutenção dos seus imóveis
          </h6>
        </Title>
      </div>
      <ContainerBlogs>
        {blogCardsData.map((blog) => (
          <Blog key={blog.id} backgroundImageUrl={blog.image}>
            <h3>{blog.title}</h3>
            <h4>{blog.description}</h4>
          </Blog>
        ))}
      </ContainerBlogs>
    </MiniBlogStylized>
  );
};

export default MiniBlog;
