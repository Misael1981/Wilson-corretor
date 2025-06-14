import styled from "styled-components";
import CardRecentlyAdded from "../CardRecentlyAdded";
import useFetch from "../../../../hooks/useFetch";

const RecentlyAddedContainer = styled.div`
  width: 30rem;
  background: var(--degrade-blue);
  min-height: 20rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    color: var(--color-golden);
    margin: 0;
    text-align: center;
    font-size: 1.5rem;
  }
`;

const RecentlyAdded = () => {
  const {
    data: allProperties,
    isLoading,
    error,
  } = useFetch("/propertiesRealEstate.json");

  // A lógica de filtragem/ordenação deve vir AQUI, depois que os dados forem carregados.
  let recentProperties = [];

  if (allProperties) {
    // 1. Crie uma cópia do array para não mutar o original
    // 2. Ordene os imóveis pelo ID em ordem decrescente (maior ID = mais recente)
    // 3. Pegue os primeiros N (ex: 3) imóveis
    recentProperties = [...allProperties] // Cria uma cópia
      .sort((a, b) => b.id - a.id) // Ordena do maior ID para o menor
      .slice(0, 5); // Pega os 3 mais recentes (você pode mudar para 4, 5, etc.)
  }

  // Tratamento de estados de carregamento e erro
  if (isLoading) return <p>Carregando imóveis recentes...</p>;
  if (error) return <p>Erro ao carregar imóveis: {error.message}</p>;

  // Se não houver imóveis ou nenhum foi filtrado
  if (!recentProperties || recentProperties.length === 0) {
    return (
      <RecentlyAddedContainer>
        <h2>Adicionado Recentemente</h2>
        <p>Nenhum imóvel recente disponível no momento.</p>
      </RecentlyAddedContainer>
    );
  }

  return (
    <RecentlyAddedContainer>
      <h2>Adicionado Recentemente</h2>
      {/* Mapeie os imóveis recentes para renderizar múltiplos CardRecentlyAdded */}
      {recentProperties.map((property) => (
        <CardRecentlyAdded key={property.id} propertyData={property} />
      ))}
    </RecentlyAddedContainer>
  );
};

export default RecentlyAdded;
