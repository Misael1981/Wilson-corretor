import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Para a navegação

const ArticleCardStylized = styled(Link)`
  // O card inteiro é um Link!
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-blue-light);
  border-radius: 0.8rem;
  overflow: hidden; /* Garante que a imagem arredondada não vaze */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none; /* Remove o sublinhado padrão do Link */
  color: inherit; /* Herda a cor do texto para não ficar azul de link */
  transition: transform 0.2s ease-in-out; /* Efeito de hover */
  background-color: white;

  &:hover {
    transform: translateY(-5px); /* Efeito de "levantar" no hover */
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 200px; /* Altura fixa para as imagens dos cards */
  object-fit: cover; /* Garante que a imagem preencha o espaço sem distorcer */
`;

const ArticleContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Permite que o conteúdo ocupe o espaço restante */
`;

const ArticleTitle = styled.h3`
  font-family: var(--font-title);
  color: var(--color-blue);
  font-size: 1.4rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const ArticleSummary = styled.p`
  color: var(--color-dark-gray);
  font-size: 0.9rem;
  line-height: 1.5;
  flex-grow: 1; /* Para que o resumo empurre o restante para baixo */
`;

const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: var(--color-gray);
  margin-top: 1rem;
`;

const ArticleCard = ({ articleData }) => {
  // Pega o slug ou ID para o Link
  const articleLink = `/blog/${articleData.slug || articleData.id}`;

  // Pega a primeira imagem do array, ou um fallback
  const imageUrl =
    articleData.imageUrl ||
    "https://placehold.co/400x200/E0E0E0/333333?text=IMAGEM+DO+ARTIGO";

  return (
    <ArticleCardStylized to={articleLink}>
      {" "}
      {/* <--- O card inteiro é um Link */}
      <ArticleImage src={imageUrl} alt={articleData.title} />
      <ArticleContent>
        <ArticleTitle>{articleData.title}</ArticleTitle>
        <ArticleSummary>{articleData.summary}</ArticleSummary>
        <ArticleMeta>
          <h1>Página ArticleCard</h1>
          <span>Por: {articleData.author || "Desconhecido"}</span>
          <span>
            {articleData.publishedAt
              ? new Date(articleData.publishedAt).toLocaleDateString("pt-BR")
              : "Data Indisp."}
          </span>
        </ArticleMeta>
      </ArticleContent>
    </ArticleCardStylized>
  );
};

export default ArticleCard;
