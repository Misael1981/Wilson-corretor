import { useParams } from "react-router-dom";
import styled from "styled-components";
import PropertyCard from "../../Components/PropertyCard";
import InputPages from "./components/InputPages";
import ButtonFilter from "./components/ButtonFilter";
import PropertyActions from "./components/PropertyActions";
import AdvancedSearch from "./components/AdvancedSearch";
import { useCallback, useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import Button from "@/Components/Button";

// Estilos
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

const LoadMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;

  button {
    padding: 1rem;
    border-radius: 0.3rem;
    border: 1px solid var(--color-blue);
    color: var(--color-blue);
    font-weight: 600;
    cursor: pointer;
  }
`;

const RealEstate = () => {
  const { category } = useParams();

  const INITIAL_LOAD_COUNT = 10;
  const LOAD_MORE_COUNT = 5;

  const [allFetchedProperties, setAllFetchedProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(INITIAL_LOAD_COUNT);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  // Buscar imóveis do Firestore
  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let q;
      if (category) {
        q = query(
          collection(db, "properties"),
          where("type", "==", category.toLowerCase()),
          orderBy("createdAt", "desc")
        );
      } else {
        q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
      }

      const querySnapshot = await getDocs(q);
      const fetchedProperties = [];
      querySnapshot.forEach((doc) => {
        fetchedProperties.push({ id: doc.id, ...doc.data() });
      });

      setAllFetchedProperties(fetchedProperties);
      setDisplayCount(INITIAL_LOAD_COUNT); // Reseta contagem
    } catch (err) {
      console.error("❌ Erro ao carregar imóveis:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  // Buscar ao carregar ou mudar categoria
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Sempre derivar properties do slice
  useEffect(() => {
    const sliced = allFetchedProperties.slice(0, displayCount);
    setProperties(sliced);
  }, [allFetchedProperties, displayCount]);

  // Botão "Ver mais"
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + LOAD_MORE_COUNT);
  };

  // Filtro avançado
  const handleFilteredProperties = (filteredResults) => {
    if (filteredResults === null) {
      // Limpar filtros: volta pro original
      setAllFetchedProperties(allFetchedProperties);
    } else {
      setAllFetchedProperties(filteredResults);
    }
    setDisplayCount(INITIAL_LOAD_COUNT);
    setIsMobileFilterOpen(false);
  };

  if (isLoading) return <p>Carregando imóveis...</p>;
  if (error) return <p>Erro ao carregar imóveis: {error.message}</p>;

  return (
    <>
      <PageContainer>
        <AdvancedSearch
          isMobileFilterOpen={isMobileFilterOpen}
          onClose={toggleMobileFilter}
          onFilter={handleFilteredProperties}
        />
        <main>
          <HeroPageContainer>
            <Breadcrumbs />
            <InputPages />
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

            {/* Botão "Ver Mais" */}
            {properties.length < allFetchedProperties.length && (
              <LoadMoreButtonContainer>
                <button
                  onClick={handleLoadMore}
                  background={"var(--color-blue)"}
                  color={"white"}
                >
                  Ver Mais Imóveis (
                  {Math.max(0, allFetchedProperties.length - properties.length)}{" "}
                  restantes)
                </button>
              </LoadMoreButtonContainer>
            )}
          </PageContainerCard>
          <Footer />
        </main>
      </PageContainer>
    </>
  );
};

export default RealEstate;
