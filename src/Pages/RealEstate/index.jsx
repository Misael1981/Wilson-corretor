// src/Pages/RealEstate/index.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import HeaderPages from "./components/HeaderPages";
import PropertyCard from "../../Components/PropertyCard"; // Importe seu PropertyCard
// import Title from "../../Components/Title"; // <--- Não importe Title se ele for h2 e você quiser o h1 exclusivo

const PageContainer = styled.div`
  /* Mantenha seus estilos para o container da página */
  margin: 0 auto;
  padding: 2rem; /* Adicionei um padding aqui para o conteúdo não colar nas bordas */
`;

const PageTitle = styled.h1`
  /* <--- ESTE SERÁ SEU H1 DA PÁGINA */
  font-family: var(--font-title);
  color: var(--color-blue);
  text-align: center;
  margin-bottom: 2rem;
  text-transform: capitalize; // Para exibir "apartamentos" como "Apartamentos"
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  justify-items: center;
`;

const RealEstate = () => {
  const { category } = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const allMockProperties = [
      {
        id: 1,
        type: "apartamentos",
        title: "Apartamento Centro",
        price: "R$ 350.000",
        imageUrl: "/assets/apartamento-01.jpg",
        description: "Amplo apartamento com 2 quartos.",
      },
      {
        id: 2,
        type: "casas",
        title: "Casa com Piscina",
        price: "R$ 800.000",
        imageUrl: "/assets/casa-01.jpg",
        description: "Casa espaçosa com piscina e churrasqueira.",
      },
      {
        id: 3,
        type: "apartamentos",
        title: "Apto Vista Mar",
        price: "R$ 1.200.000",
        imageUrl:
          "https://via.placeholder.com/300x200/F0F8FF/000000?text=Apto2",
        description: "Cobertura duplex com vista deslumbrante.",
      },
      {
        id: 4,
        type: "terrenos",
        title: "Terreno Grande",
        price: "R$ 250.000",
        imageUrl:
          "https://via.placeholder.com/300x200/90EE90/000000?text=Terreno1",
        description: "Terreno pronto para construir.",
      },
      {
        id: 5,
        type: "chacaras",
        title: "Sítio com Lago",
        price: "R$ 1.500.000",
        imageUrl: "/assets/sitio-01.jpg",
        description: "Refúgio perfeito para o fim de semana.",
      },
      {
        id: 6,
        type: "casas",
        title: "Casa de Condomínio",
        price: "R$ 950.000",
        imageUrl: "/assets/casa-02.jpg",
        description: "Casa com segurança 24h.",
      },
      {
        id: 7,
        type: "lojas",
        title: "Hamburgueria",
        price: "R$ 950.000",
        imageUrl: "/assets/ponto-comercial-03.jpg",
        description: "Hamburgueria pronta",
      },
    ];
    const normalize = (str) =>
      str.replace(/-/g, "").replace(/s$/, "").toLowerCase();

    const filtered = category
      ? allMockProperties.filter(
          (prop) => normalize(prop.type) === normalize(category)
        )
      : allMockProperties;

    console.log(category, filtered);

    setProperties(filtered);
    setLoading(false);
  }, [category]);

  if (loading) return <PageContainer>Carregando imóveis...</PageContainer>;
  if (error)
    return <PageContainer>Erro ao carregar imóveis: {error}</PageContainer>;

  return (
    <>
      <HeaderPages /> {/* Seu cabeçalho de páginas internas */}
      <PageContainer>
        {/* Usando o PageTitle como o H1 da página */}
        <PageTitle>
          {category ? category.replace(/-/g, " ") : "Todos os Imóveis"}
        </PageTitle>

        {/* Você pode usar o componente Title aqui, se quiser um subtítulo,
            mas certifique-se de que ele renderize um h2 ou outro cabeçalho
            abaixo do h1, como em <h2>Selecione o imóvel perfeito para você</h2>
        */}
        {/* <Title>Selecione o imóvel perfeito para você</Title> */}

        {properties.length === 0 ? (
          <p>
            Nenhum imóvel encontrado para a categoria "
            {category ? category.replace(/-/g, " ") : ""}".
          </p>
        ) : (
          <PropertiesGrid>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} /> // <-- Aqui está certo!
            ))}
          </PropertiesGrid>
        )}
      </PageContainer>
      {/* <Footer /> */}
    </>
  );
};

export default RealEstate;
