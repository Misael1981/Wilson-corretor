import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom"; // Importe useNavigate
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

// Styled Components (mantidos os mesmos)
const ArticlesPageContainer = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
`;

const PageTitle = styled.h1`
  color: #333;
  font-size: 2rem;
  margin: 0;
`;

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

const ArticlesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
`;

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

const TableBody = styled.tbody`
  tr {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
    &:hover {
      background-color: #f0f5ff;
    }
  }
`;

const TableRow = styled.tr`
  td {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    color: #444;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

// Corrigido para Transient Props ($)
const ActionButton = styled.button`
  background-color: ${(props) => {
    if (props.$primary) return "var(--color-blue, #0f1e2e)";
    if (props.$danger) return "#dc3545";
    return "#6c757d"; // Default
  }};
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) => {
      if (props.$primary) return "var(--color-dark-blue, #0a141f)";
      if (props.$danger) return "#c82333";
      return "#5a6268";
    }};
    transform: translateY(-1px);
  }
`;

const ArticlesAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicialize useNavigate

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const articlesCollectionRef = collection(db, "articles");
      const querySnapshot = await getDocs(articlesCollectionRef);

      const fetchedArticles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setArticles(fetchedArticles);
      console.log("Artigos carregados:", fetchedArticles);
    } catch (err) {
      console.error("Erro ao buscar artigos:", err);
      setError("Não foi possível carregar os artigos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (articleId) => {
    navigate(`/admin/artigos/editar/${articleId}`); // Navega para a página de edição
  };

  const handleDelete = async (articleId) => {
    if (window.confirm("Tem certeza que deseja excluir este artigo?")) {
      try {
        await deleteDoc(doc(db, "articles", articleId));
        setArticles(articles.filter((article) => article.id !== articleId));
        console.log(`Artigo com ID: ${articleId} excluído com sucesso!`);
      } catch (err) {
        console.error("Erro ao excluir artigo:", err);
        setError("Não foi possível excluir o artigo. Tente novamente.");
      }
    }
  };

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
                  {/* CORREÇÃO AQUI: Use article.publishedAt */}
                  {article.publishedAt && article.publishedAt.seconds
                    ? new Date(
                        article.publishedAt.seconds * 1000
                      ).toLocaleDateString("pt-BR")
                    : "N/A"}
                </td>
                <td>
                  <ActionsContainer>
                    <ActionButton
                      $primary
                      onClick={() => handleEdit(article.id)}
                    >
                      {" "}
                      {/* Use $primary */}
                      Editar
                    </ActionButton>
                    <ActionButton
                      $danger
                      onClick={() => handleDelete(article.id)}
                    >
                      {" "}
                      {/* Use $danger */}
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
