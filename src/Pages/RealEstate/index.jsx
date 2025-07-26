import { useParams } from "react-router-dom";
import styled from "styled-components";
import PropertyCard from "../../Components/PropertyCard";
import InputPages from "./components/InputPages";
import ButtonFilter from "./components/ButtonFilter";
import PropertyActions from "./components/PropertyActions";
import AdvancedSearch from "./components/AdvancedSearch";
import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"; // Firestore
import { db } from "@/firebase";

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
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // NOVO ESTADO: Para controlar a visibilidade do filtro mobile
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // NOVA FUNÇÃO: Para alternar a visibilidade
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let q;
        if (category) {
          q = query(
            collection(db, "properties"),
            where("type", "==", category.toLowerCase()), // Filtra pela categoria
            orderBy("createdAt", "desc") // Ordena pelos mais recentes
          );
        } else {
          // Se não houver categoria, busca todos os imóveis (ou um limite)
          q = query(
            collection(db, "properties"),
            orderBy("createdAt", "desc") // Ordena pelos mais recentes
            // limit(20) // Opcional: Limitar para não carregar muitos de uma vez
          );
        }

        const querySnapshot = await getDocs(q);
        const fetchedProperties = [];
        querySnapshot.forEach((doc) => {
          fetchedProperties.push({ id: doc.id, ...doc.data() });
        });
        setProperties(fetchedProperties);
      } catch (err) {
        console.error("Erro ao carregar imóveis:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [category]);

  if (isLoading) return <p>Carregando imóveis...</p>;
  if (error) return <p>Erro ao carregar imóveis: {error.message}</p>;
  if (!properties || properties.length === 0)
    return (
      <PageContainer>
        <main>
          <HeroPageContainer>
            <Breadcrumbs />
            <InputPages />
            <ButtonFilter onClick={toggleMobileFilter} />
            <PropertyActions />
          </HeroPageContainer>
          <PageContainerCard>
            <PageTitle>
              Nenhum {category ? category.replace(/-/g, " ") : "imóvel"}{" "}
              encontrado.
            </PageTitle>
          </PageContainerCard>
          <Footer />
        </main>
      </PageContainer>
    );

  return (
    <>
      <PageContainer>
        <AdvancedSearch
          isMobileFilterOpen={isMobileFilterOpen}
          onClose={toggleMobileFilter}
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
          </PageContainerCard>
          <Footer />
        </main>
      </PageContainer>
    </>
  );
};

export default RealEstate;
