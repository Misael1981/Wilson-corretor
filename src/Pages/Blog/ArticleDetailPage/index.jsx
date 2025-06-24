import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import HeaderPages from "../../RealEstate/components/HeaderPages";
import Footer from "../../../Components/Footer";
import Article from "../components/Article";
import IndexPosts from "../components/IndexPosts";
import styled from "styled-components";

const ContainerArticlesStylized = styled.div`
  width: 100%;
  margin: 2rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const ArticleDetailPage = () => {
  const { id } = useParams();

  const {
    data: allArticles,
    isLoading: articlesLoading,
    error: articlesError,
  } = useFetch("/blogArticles.json"); // Caminho para seu JSON de artigos

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // --- CONSOLE.LOGS DE DEBUG GERAIS (MANTENHA ESTES) ---
    console.log("--- DEBUG ArticleDetailPage GERAL ---");
    console.log("ID/Slug da URL (useParams):", id);
    console.log(
      "Estado de Carregamento dos Artigos (isLoading):",
      articlesLoading
    );
    console.log("Erro ao Carregar Artigos (error):", articlesError);
    console.log("Todos os Artigos Carregados (allArticles):", allArticles);
    console.log("-------------------------------------");
    // ----------------------------------------------------

    if (articlesLoading) return;

    if (articlesError) {
      setError(articlesError);
      setLoading(false);
      return;
    }

    if (allArticles) {
      const foundArticle = allArticles.find(
        (art) =>
          String(art.id) === String(id) || String(art.slug) === String(id)
      );

      if (foundArticle) {
        setArticle(foundArticle);
        setLoading(false);
      } else {
        setError(new Error("Artigo não encontrado."));
        setLoading(false);
      }
    }
  }, [id, allArticles, articlesLoading, articlesError]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "5rem" }}>
        Carregando detalhes do artigo...
      </p>
    );
  if (error)
    return (
      <p style={{ textAlign: "center", color: "red", marginTop: "5rem" }}>
        Erro: {error.message}
      </p>
    );
  if (!article)
    return (
      <p style={{ textAlign: "center", marginTop: "5rem" }}>
        Artigo não disponível.
      </p>
    );

  return (
    <>
      <HeaderPages />
      <main>
        <ContainerArticlesStylized>
          <Article article={article} />
          <article>
            <IndexPosts articles={allArticles} />
          </article>
        </ContainerArticlesStylized>
      </main>
      <Footer />
    </>
  );
};

export default ArticleDetailPage;
