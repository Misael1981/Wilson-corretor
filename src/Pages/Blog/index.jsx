import styled from "styled-components";
import Breadcrumbs from "../../Components/Breadcrumbs";
import useFetch from "../../hooks/useFetch";
import ArticleCard from "./components/ArticleCard";
import FeaturedArticleCard from "./components/FeaturedArticleCard";
import IndexPosts from "./components/IndexPosts";
import WorkWithUs from "../../Components/WorkWithUsBanner";
import Footer from "../../Components/Footer";

const BlogTitle = styled.section`
  box-sizing: border-box;
  padding: 2rem;

  h1 {
    font-family: var(--font-title);
    color: var(--color-blue);
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  p {
    font-size: 1.2rem;
    line-height: 1.6;
    color: var(--color-blue);
  }
`;

const MainStylized = styled.main`
  width: 100%;
`;

const BlogMainSection = styled.section`
  max-width: 95vw;
  margin: 2rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const BlogCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 2rem auto;
`;

const Blog = () => {
  const {
    data: allArticles,
    isLoading,
    error,
  } = useFetch("/blogArticles.json");

  if (isLoading) return <p>Carregando artigos do blog...</p>;
  if (error) return <p>Erro ao carregar artigos: {error.message}</p>;

  const artigoMaisRecente = allArticles.reduce((maior, artigo) =>
    Number(artigo.id) > Number(maior.id) ? artigo : maior
  );

  if (!allArticles || allArticles.length === 0) {
    return (
      <>
        <div>
          <p style={{ textAlign: "center" }}>
            Nenhum artigo disponível no momento.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <MainStylized>
        <BlogTitle>
          <h1>O Blog para a sua casa</h1>
          <p>
            Aqui você encontra dicas de financiamento, oportunidades para
            empreendimentos, sugestões para você que quer vender seu imóvel,
            além de dicas para você cuidar e valorizar seu imóvel!
          </p>
        </BlogTitle>
        <BlogMainSection>
          <FeaturedArticleCard article={artigoMaisRecente} />
          <IndexPosts articles={allArticles} />
        </BlogMainSection>
        <BlogCardsContainer>
          {allArticles.map((article) => (
            <ArticleCard
              key={article.id || article.slug}
              articleData={article}
            />
          ))}
        </BlogCardsContainer>
        <WorkWithUs />
      </MainStylized>
      <Footer />
    </>
  );
};

export default Blog;
