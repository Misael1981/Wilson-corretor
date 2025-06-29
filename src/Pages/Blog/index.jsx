import useFetch from "../../hooks/useFetch";
import ArticleCard from "./components/ArticleCard";

const Blog = () => {
  const {
    data: allArticles,
    isLoading,
    error,
  } = useFetch("/blogArticles.json");

  if (isLoading) return <p>Carregando artigos do blog...</p>;
  if (error) return <p>Erro ao carregar artigos: {error.message}</p>;

  // Se não houver artigos ou o array estiver vazio
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
      <h1>Blog</h1>
      {allArticles.map((article) => (
        <ArticleCard key={article.id || article.slug} articleData={article} />
      ))}
    </>
  );
};

export default Blog;
