import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom"; // Importa useSearchParams
import styled from "styled-components";
import PropertyCard from "../../Components/PropertyCard";
import InputPages from "./components/InputPages";
import ButtonFilter from "./components/ButtonFilter";
import PropertyActions from "./components/PropertyActions";
import AdvancedSearch from "./components/AdvancedSearch";
import Footer from "../../Components/Footer";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Button from "@/Components/Button";

// Estilos (mantidos seus estilos)
const PageContainer = styled.div`
  @media screen and (min-width: 1020px) {
    display: flex;
  }
`;

const PageContainerCard = styled.div`
  margin: 0 auto;
  padding: 2rem;
  flex-grow: 1; /* Garante que ocupe o espaço restante */
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
  align-items: flex-start; /* Alinha os cards ao topo */
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
    background-color: transparent; /* Garante que seu ButtonStyled não seja sobrescrito */
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: var(--color-blue);
      color: white;
    }
  }
`;

const RealEstate = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams(); // NOVO: Hook para ler query parameters

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

  // Função para buscar imóveis do Firestore
  const fetchProperties = useCallback(
    async (filtersFromQueryParams = {}) => {
      // NOVO: Recebe filtros dos query params
      setIsLoading(true);
      setError(null);
      try {
        let q = collection(db, "properties");
        console.log("🔍 Buscando imóveis...");
        
        // Aplica filtro de categoria da URL (se existir)
        if (category) {
          console.log(`🏷️ Filtrando por categoria: ${category}`);
          // Filtra todos os documentos localmente por enquanto
        }
        
        const querySnapshot = await getDocs(q);
        console.log(
          "✅ Query executada com sucesso. Documentos encontrados:",
          querySnapshot.size
        );
        const fetchedProperties = [];
        querySnapshot.forEach((doc) => {
          fetchedProperties.push({ id: doc.id, ...doc.data() });
        });

        // Filtra localmente por categoria se especificada na URL
        let filteredProperties = fetchedProperties;
        if (category) {
          filteredProperties = fetchedProperties.filter((property) => {
            // Verifica se o tipo do imóvel corresponde à categoria da URL
            return property.type && property.type.toLowerCase() === category.toLowerCase();
          });
          console.log(`🎯 Imóveis filtrados por '${category}': ${filteredProperties.length}`);
        }

        console.log(filtersFromQueryParams);
        setAllFetchedProperties(filteredProperties);
        setProperties(filteredProperties.slice(0, INITIAL_LOAD_COUNT));
        setDisplayCount(INITIAL_LOAD_COUNT);
      } catch (err) {
        console.error("Erro detalhado ao buscar imóveis:", err);
        console.error("Código do erro:", err.code);
        console.error("Mensagem do erro:", err.message);
        setError(`Erro ao carregar imóveis: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    },
    [category, searchParams]
  ); // NOVO: Adiciona searchParams como dependência

  // Buscar ao carregar ou mudar categoria ou query params
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Sempre derivar properties do slice
  useEffect(() => {
    setProperties(allFetchedProperties.slice(0, displayCount));
  }, [allFetchedProperties, displayCount]);

  // Botão "Ver mais"
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + LOAD_MORE_COUNT);
  };

  // Filtro avançado (do AdvancedSearch)
  const handleFilteredProperties = useCallback(
    (filteredResults) => {
      // Se o AdvancedSearch enviou null (limpar filtros)
      if (filteredResults === null) {
        // Re-executa a busca inicial para pegar os imóveis sem filtros do AdvancedSearch
        // mas respeitando a categoria da URL ou os query params iniciais.
        fetchProperties({}); // Passa um objeto vazio para não usar filtros do AdvancedSearch
      } else {
        setAllFetchedProperties(filteredResults); // Atualiza a lista COMPLETA com os resultados filtrados
        setDisplayCount(INITIAL_LOAD_COUNT); // Reseta a contagem para 10
      }
      setIsMobileFilterOpen(false);
    },
    [fetchProperties]
  ); // Adiciona fetchProperties como dependência

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
              Temos {allFetchedProperties.length}{" "}
              {category ? category.replace(/-/g, " ") : "imóveis"}
              {allFetchedProperties.length === 1 ? "" : "s"}{" "}
              {allFetchedProperties.length === 1 ? "disponível" : "disponíveis"}
            </PageTitle>
            <PropertiesGrid>
              {properties.length === 0 && allFetchedProperties.length > 0 ? (
                <p>Nenhum imóvel encontrado com os filtros aplicados.</p>
              ) : properties.length === 0 &&
                allFetchedProperties.length === 0 ? (
                <p>Nenhum imóvel cadastrado.</p>
              ) : (
                properties.map((property) => (
                  <PropertyCard key={property.id} propertyData={property} />
                ))
              )}
            </PropertiesGrid>

            {/* Botão "Ver Mais" */}
            {properties.length < allFetchedProperties.length && (
              <LoadMoreButtonContainer>
                <Button
                  onClick={handleLoadMore}
                  background={"var(--color-blue)"}
                  color={"white"}
                >
                  Ver Mais Imóveis (
                  {Math.max(0, allFetchedProperties.length - properties.length)}{" "}
                  restantes)
                </Button>
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
