import { useParams } from "react-router-dom";
import styled from "styled-components";
import HeaderPages from "./components/HeaderPages";
import PropertyCard from "../../Components/PropertyCard";
import useFetch from "../../hooks/useFetch";

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-family: var(--font-title);
  color: var(--color-blue);
  text-align: center;
  margin-bottom: 2rem;
  text-transform: capitalize;
`;

const PropertiesGrid = styled.div`
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  justify-items: center; */
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
        <PageTitle>
          {category ? category.replace(/-/g, " ") : "Todos os Imóveis"}
        </PageTitle>

        <PropertiesGrid>
          {properties.map((property) => (
            <PropertyCard key={property.id} propertyData={property} />
          ))}
          {console.log("Do RealEstate", properties)}
        </PropertiesGrid>
      </PageContainer>
    </>
  );
};

export default RealEstate;
