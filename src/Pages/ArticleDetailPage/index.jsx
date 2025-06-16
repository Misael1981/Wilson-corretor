import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch"; // Seu hook de fetch
import HeaderPages from "../RealEstate/components/HeaderPages"; // Reutilize o header
import Footer from "../../Components/Footer"; // Reutilize o footer

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
  // 1. Pega o ID (ou slug) da URL
  const { id } = useParams(); // 'id' aqui será o slug ou ID do artigo vindo da URL

  // 2. Usa o useFetch para buscar TODOS os artigos (como o blogArticles.json)
  const {
    data: allArticles,
    isLoading,
    error,
  } = useFetch("/blogArticles.json"); // <--- Caminho para o seu JSON de artigos

  // Estado para armazenar o artigo específico que será exibido
  const [article, setArticle] = useState(null);

  // 3. Usa useEffect para encontrar o artigo quando allArticles ou id mudarem
  useEffect(() => {
    if (allArticles) {
      // Tenta encontrar o artigo pelo slug primeiro, se existir
      let foundArticle = allArticles.find((a) => a.slug === id);

      // Se não encontrou pelo slug, tenta encontrar pelo ID (caso você use IDs numéricos na URL)
      if (!foundArticle) {
        foundArticle = allArticles.find((a) => String(a.id) === id);
      }

      setArticle(foundArticle);
    }
  }, [allArticles, id]); // Re-executa se os dados dos artigos ou o ID/slug da URL mudarem

  // 4. Lógica de carregamento, erro e artigo não encontrado
  if (isLoading)
    return (
      <p style={{ textAlign: "center", padding: "2rem" }}>
        Carregando detalhes do artigo...
      </p>
    );
  if (error)
    return (
      <p style={{ textAlign: "center", padding: "2rem", color: "red" }}>
        Erro ao carregar artigo: {error.message}
      </p>
    );
  if (!article)
    return (
      <p style={{ textAlign: "center", padding: "2rem" }}>
        Artigo não encontrado.
      </p>
    );

  // 5. Renderiza o conteúdo completo do artigo
  return (
    <>
      <HeaderPages /> {/* Seu Header global */}
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
