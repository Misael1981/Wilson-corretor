import styled from "styled-components";

const ArticleDetailContainer = styled.section`
  padding: 1rem;
  width: 45rem;
  max-width: 85vw;
  background-color: #f9f9f9;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (width > 1020px) {
    padding: 2rem;
  }
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

const Article = ({ article }) => {
  return (
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
  );
};

export default Article;
