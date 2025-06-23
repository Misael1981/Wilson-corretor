import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch"; // Seu hook de fetch
import HeaderPages from "../RealEstate/components/HeaderPages"; // Reutilize o header
import Footer from "../../Components/Footer";

// Styled Components para a página de detalhes do artigo
const ArticleDetailContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const ArticleImage = styled.img`
  width: 100%;
  max-height: 450px;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1.5rem;
`;

const ArticleTitle = styled.h1`
  font-family: var(--font-title);
  color: var(--color-blue);
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
`;

const ArticleMeta = styled.div`
  font-size: 0.9rem;
  color: var(--color-gray);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-blue-light);
  padding-bottom: 0.5rem;
`;

const ArticleContentSection = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-dark-gray);

  p {
    margin-bottom: 1.5rem;
  }
`;

const ArticleDetailPage = () => {
  const { id } = useParams(); // Pega o 'id' ou 'slug' da URL

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

  // 5. Renderiza o conteúdo completo do artigo
  return (
    <>
      <HeaderPages />
      <ArticleDetailContainer>
        <ArticleImage
          src={
            article.imageUrl ||
            "https://placehold.co/800x450/E0E0E0/333333?text=IMAGEM+DO+ARTIGO"
          }
          alt={article.title}
        />
        <ArticleTitle>{article.title}</ArticleTitle>
        <ArticleMeta>
          <span>Por: {article.author || "Desconhecido"}</span>
          <span>
            Publicado em:{" "}
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString("pt-BR")
              : "Data Indisp."}
          </span>
        </ArticleMeta>
        <ArticleContentSection>
          {/* Renderiza cada parágrafo do array de conteúdo */}
          {article.content &&
            article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          {!article.content && (
            <p>Nenhum conteúdo detalhado disponível para este artigo.</p>
          )}
        </ArticleContentSection>
      </ArticleDetailContainer>
      <Footer /> {/* Seu Footer global */}
    </>
  );
};

export default ArticleDetailPage;
