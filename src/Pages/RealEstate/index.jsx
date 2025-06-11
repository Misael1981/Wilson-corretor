import { useParams } from "react-router-dom";
import styled from "styled-components";
import HeaderPages from "./components/HeaderPages";
import PropertyCard from "../../Components/PropertyCard";
import useFetch from "../../hooks/useFetch";
import InputPages from "./components/InputPages";
import ButtonFilter from "./components/ButtonFilter";
import PropertyActions from "./components/PropertyActions";
import AdvancedSearch from "./components/AdvancedSearch";
import { useState } from "react";

const PageContainer = styled.div`
  @media screen and (width > 1020px) {
    display: flex;
  }
`;

const PageContainerCard = styled.div`
  margin: 0 auto;
  padding: 2rem;
`;

const HeroPageContainer = styled.section`
  background-color: #f0eaea;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-blue-ligth);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PageTitle = styled.h1`
  font-family: var(--font-title);
  color: var(--color-blue);
  text-align: center;
  margin-bottom: 2rem;
  text-transform: capitalize;
`;

const PropertiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const RealEstate = () => {
  const { category } = useParams();
  const {
    data: allProperties,
    isLoading,
    error,
  } = useFetch("/propertiesRealEstate.json");

  // NOVO ESTADO: Para controlar a visibilidade do filtro mobile
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // NOVA FUNÇÃO: Para alternar a visibilidade
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  if (isLoading) return <p>Carregando imóveis...</p>;
  if (error) return <p>Erro ao carregar imóveis: {error.message}</p>;

  // Filtra os imóveis.
  // Se allProperties for vazio, a filtragem resultará em um array vazio, o que é correto.
  const properties = allProperties.filter((prop) =>
    category
      ? prop.type && prop.type.toLowerCase() === category.toLowerCase()
      : true
  );

  return (
    <>
      <HeaderPages />
      <PageContainer>
        {/* REMOVIDO: isMobileFilterOpen &&  <--- Agora AdvancedSearch SEMPRE é renderizado */}
        {/* A visibilidade é controlada pelo CSS dentro do AdvancedSearch Stylized */}
        <AdvancedSearch
          isMobileFilterOpen={isMobileFilterOpen} // Passa o estado para o filho
          onClose={toggleMobileFilter} // Passa a função de fechar para o filho (se tiver botão fechar no modal)
        />
        <main>
          <HeroPageContainer>
            <InputPages />
            {/* O ButtonFilter só aparece em mobile, e chama o toggleMobileFilter */}
            <ButtonFilter onClick={toggleMobileFilter} />
            <PropertyActions />
          </HeroPageContainer>
          <PageContainerCard>
            <PageTitle>
              Temos {properties.length}{" "}
              {category ? category.replace(/-/g, " ") : "imóveis"}
              {properties.length === 1 ? "" : "s"}{" "}
              {properties.length === 1 ? "disponível" : "disponíveis"}
            </PageTitle>
            <PropertiesGrid>
              {properties.map((property) => (
                <PropertyCard key={property.id} propertyData={property} />
              ))}
            </PropertiesGrid>
          </PageContainerCard>
        </main>
      </PageContainer>
    </>
  );
};

export default RealEstate;
