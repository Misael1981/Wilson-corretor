import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase"; // Assumindo que firebase.js exporta 'db'

// Styled Components para o layout da página de Imóveis
const PropertiesPageContainer = styled.div`
  padding: 1.5rem;
  background-color: #fff; /* Fundo branco para o conteúdo da página */
  border-radius: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Sombra suave */
`;

// Cabeçalho da página (título e botão de nova ação)
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
`;

// Título da página
const PageTitle = styled.h1`
  color: #333;
  font-size: 2rem;
  margin: 0;
`;

// Botão para cadastrar novo imóvel
const NewPropertyButton = styled(Link)`
  background-color: var(--color-golden, #f39c12);
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--color-dark-orange, #e67e22);
    transform: translateY(-2px);
  }
`;

// Estilos para a tabela de imóveis
const PropertiesTable = styled.table`
  width: 100%;
  border-collapse: collapse; /* Remove espaçamento entre as bordas das células */
  margin-top: 1.5rem;
`;

// Cabeçalho da tabela
const TableHeader = styled.thead`
  background-color: #f0f0f0;
  th {
    padding: 1rem;
    text-align: left;
    color: #555;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
  }
`;

// Corpo da tabela
const TableBody = styled.tbody`
  tr {
    &:nth-child(even) {
      /* Estilo para linhas pares */
      background-color: #f9f9f9;
    }
    &:hover {
      /* Estilo de hover para as linhas */
      background-color: #f0f5ff; /* Um azul bem suave no hover */
    }
  }
`;

// Linha da tabela
const TableRow = styled.tr`
  td {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    color: #444;
  }
`;

// Container para os botões de ação na tabela
const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

// Botão de ação (Editar/Excluir)
const ActionButton = styled.button`
  background-color: ${(props) =>
    props.primary
      ? "var(--color-blue, #0f1e2e)"
      : "#dc3545"}; /* Azul para Editar, Vermelho para Excluir */
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.primary ? "var(--color-dark-blue, #0a141f)" : "#c82333"};
    transform: translateY(-1px);
  }
`;

const PropertiesAdmin = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Função para buscar os imóveis do Firestore
  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const propertiesCollectionRef = collection(db, "properties"); // Referência à coleção 'properties'
      const querySnapshot = await getDocs(propertiesCollectionRef);

      const fetchedProperties = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProperties(fetchedProperties);
      console.log("Imóveis carregados:", fetchedProperties); // Para depuração
    } catch (err) {
      console.error("Erro ao buscar imóveis:", err);
      setError("Não foi possível carregar os imóveis. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com a edição de um imóvel
  const handleEdit = (propertyId) => {
    console.log(`Editar imóvel com ID: ${propertyId}`);
    navigate(`/admin/imoveis/editar/${propertyId}`);
    // Implementar navegação para a página de edição: navigate(`/admin/imoveis/editar/${propertyId}`);
  };

  // Função para lidar com a exclusão de um imóvel
  const handleDelete = async (propertyId) => {
    if (window.confirm("Tem certeza que deseja excluir este imóvel?")) {
      // Usar modal customizado em produção
      try {
        await deleteDoc(doc(db, "properties", propertyId));
        setProperties(
          properties.filter((property) => property.id !== propertyId)
        ); // Remove da lista local
        console.log(`Imóvel com ID: ${propertyId} excluído com sucesso!`);
      } catch (err) {
        console.error("Erro ao excluir imóvel:", err);
        setError("Não foi possível excluir o imóvel. Tente novamente.");
      }
    }
  };

  // Carrega os imóveis quando o componente é montado
  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <PropertiesPageContainer>
        <p>Carregando imóveis...</p>
      </PropertiesPageContainer>
    );
  }

  if (error) {
    return (
      <PropertiesPageContainer>
        <p style={{ color: "red" }}>{error}</p>
      </PropertiesPageContainer>
    );
  }

  return (
    <PropertiesPageContainer>
      <PageHeader>
        <PageTitle>Gerenciar Imóveis</PageTitle>
        <NewPropertyButton to="/admin/imoveis/cadastrar">
          + Novo Imóvel
        </NewPropertyButton>
      </PageHeader>

      <PropertiesTable>
        <TableHeader>
          <TableRow>
            <th>Título</th>
            <th>Endereço</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Data de Cadastro</th>
            <th>Ações</th>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.length > 0 ? (
            properties.map((property) => (
              <TableRow key={property.id}>
                <td>{property.title || "Sem Título"}</td>
                <td>{property.address || "Endereço Indisponível"}</td>
                <td>
                  {property.price
                    ? `R$ ${property.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "N/A"}
                </td>
                <td>{property.status || "Ativo"}</td>
                <td>
                  {property.createdAt
                    ? new Date(
                        property.createdAt.seconds * 1000
                      ).toLocaleDateString("pt-BR")
                    : "N/A"}
                </td>
                <td>
                  <ActionsContainer>
                    <ActionButton
                      primary
                      onClick={() => handleEdit(property.id)}
                    >
                      Editar
                    </ActionButton>
                    <ActionButton onClick={() => handleDelete(property.id)}>
                      Excluir
                    </ActionButton>
                  </ActionsContainer>
                </td>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>
                Nenhum imóvel encontrado.
              </td>
            </TableRow>
          )}
        </TableBody>
      </PropertiesTable>
    </PropertiesPageContainer>
  );
};

export default PropertiesAdmin;
