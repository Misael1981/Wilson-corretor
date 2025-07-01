import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ContainerArticleCard = styled.div`
  width: 350px;
  max-width: 95vw;
`;

const ArticleCardStylized = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-blue-light);
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  text-decoration: none;
  color: inherit;
  background-color: white;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ArticleContent = styled.div`
  padding: 1rem;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
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
  font-size: 0.7rem;
  line-height: 1.5;
  flex-grow: 1;
`;

const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.6rem;
  color: var(--color-gray);
  margin-top: 1rem;
`;

const ArticleCard = ({ articleData }) => {
  const articleLink = `/blog/${articleData.slug || articleData.id}`;

  const imageUrl =
    articleData.imageUrl ||
    "https://placehold.co/400x200/E0E0E0/333333?text=IMAGEM+DO+ARTIGO";

  return (
    <ContainerArticleCard>
      <ArticleCardStylized to={articleLink}>
        {" "}
        {/* <--- O card inteiro é um Link */}
        <ArticleImage src={imageUrl} alt={articleData.title} />
        <ArticleContent>
          <ArticleTitle>{articleData.title}</ArticleTitle>
          <ArticleSummary>{articleData.summary}</ArticleSummary>
          <ArticleMeta>
            <span>Por: {articleData.author || "Desconhecido"}</span>
            <span>
              {articleData.publishedAt
                ? new Date(articleData.publishedAt).toLocaleDateString("pt-BR")
                : "Data Indisp."}
            </span>
          </ArticleMeta>
        </ArticleContent>
      </ArticleCardStylized>
    </ContainerArticleCard>
  );
};

export default ArticleCard;
