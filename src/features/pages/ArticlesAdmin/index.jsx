import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase"; // Assumindo que firebase.js exporta 'db'

// Styled Components para o layout da página de Artigos
const ArticlesPageContainer = styled.div`
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

// Botão para criar novo artigo
const NewArticleButton = styled(Link)`
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

// Estilos para a tabela de artigos
const ArticlesTable = styled.table`
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

const ArticlesAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os artigos do Firestore
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const articlesCollectionRef = collection(db, "articles"); // Referência à coleção 'articles'
      const querySnapshot = await getDocs(articlesCollectionRef);

      const fetchedArticles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setArticles(fetchedArticles);
      console.log("Artigos carregados:", fetchedArticles); // Para depuração
    } catch (err) {
      console.error("Erro ao buscar artigos:", err);
      setError("Não foi possível carregar os artigos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com a edição de um artigo
  const handleEdit = (articleId) => {
    console.log(`Editar artigo com ID: ${articleId}`);
    // Implementar navegação para a página de edição: navigate(`/admin/artigos/editar/${articleId}`);
  };

  // Função para lidar com a exclusão de um artigo
  const handleDelete = async (articleId) => {
    if (window.confirm("Tem certeza que deseja excluir este artigo?")) {
      // Usar modal customizado em produção
      try {
        await deleteDoc(doc(db, "articles", articleId));
        setArticles(articles.filter((article) => article.id !== articleId)); // Remove da lista local
        console.log(`Artigo com ID: ${articleId} excluído com sucesso!`);
      } catch (err) {
        console.error("Erro ao excluir artigo:", err);
        setError("Não foi possível excluir o artigo. Tente novamente.");
      }
    }
  };

  // Carrega os artigos quando o componente é montado
  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <ArticlesPageContainer>
        <p>Carregando artigos...</p>
      </ArticlesPageContainer>
    );
  }

  if (error) {
    return (
      <ArticlesPageContainer>
        <p style={{ color: "red" }}>{error}</p>
      </ArticlesPageContainer>
    );
  }

  return (
    <ArticlesPageContainer>
      <PageHeader>
        <PageTitle>Gerenciar Artigos</PageTitle>
        <NewArticleButton to="/admin/artigos/criar">
          + Novo Artigo
        </NewArticleButton>
      </PageHeader>

      <ArticlesTable>
        <TableHeader>
          <TableRow>
            <th>Título</th>
            <th>Autor</th>
            <th>Status</th>
            <th>Data de Publicação</th>
            <th>Ações</th>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.length > 0 ? (
            articles.map((article) => (
              <TableRow key={article.id}>
                <td>{article.title || "Sem Título"}</td>
                <td>{article.author || "Desconhecido"}</td>
                <td>{article.status || "Rascunho"}</td>
                <td>
                  {article.publicationDate
                    ? new Date(
                        article.publicationDate.seconds * 1000
                      ).toLocaleDateString("pt-BR")
                    : "N/A"}
                </td>
                <td>
                  <ActionsContainer>
                    <ActionButton
                      primary
                      onClick={() => handleEdit(article.id)}
                    >
                      Editar
                    </ActionButton>
                    <ActionButton onClick={() => handleDelete(article.id)}>
                      Excluir
                    </ActionButton>
                  </ActionsContainer>
                </td>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>
                Nenhum artigo encontrado.
              </td>
            </TableRow>
          )}
        </TableBody>
      </ArticlesTable>
    </ArticlesPageContainer>
  );
};

export default ArticlesAdmin;
