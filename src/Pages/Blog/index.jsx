import React, { useState, useEffect } from "react"; // Importa useEffect
import styled from "styled-components";
import Breadcrumbs from "../../Components/Breadcrumbs";
// import useFetch from "../../hooks/useFetch"; // REMOVIDO: Não usaremos mais o useFetch
import ArticleCard from "./components/ArticleCard";
import FeaturedArticleCard from "./components/FeaturedArticleCard";
import IndexPosts from "./components/IndexPosts";
import WorkWithUs from "../../Components/WorkWithUsBanner";
import Footer from "../../Components/Footer";

// Importações do Firestore
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from "@/firebase"; // Importa a instância do db

// REMOVIDO: Não precisamos mais importar imagens locais, pois virão do Firebase Storage
// import financialImage from "./assets/financing.jpg";
// import empreendimentos from "./assets/empreendimentos.jpg";
// import manutencao from "./assets/manutencao.jpg";
// import vendas from "./assets/vendas.jpg";

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
  const [allArticles, setAllArticles] = useState([]); // Usaremos useState para os artigos
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  // useEffect para buscar os artigos do Firestore quando o componente montar
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const articlesCollectionRef = collection(db, "articles");
        // Consulta para pegar todos os artigos publicados, ordenados pelo mais recente
        const q = query(
          articlesCollectionRef,
          where("status", "==", "published"), // Filtra apenas artigos publicados
          orderBy("publishedAt", "desc") // Ordena do mais novo para o mais antigo
        );
        const querySnapshot = await getDocs(q);

        const fetchedArticles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllArticles(fetchedArticles);
      } catch (err) {
        console.error("Erro ao carregar artigos para o Blog:", err);
        setError(err); // Armazena o objeto de erro completo
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []); // O array de dependências vazio garante que o efeito roda apenas uma vez

  if (isLoading) {
    return (
      <MainStylized>
        <p
          style={{
            textAlign: "center",
            padding: "2rem",
            fontSize: "1.2rem",
            color: "var(--color-blue)",
          }}
        >
          Carregando artigos do blog...
        </p>
      </MainStylized>
    );
  }

  if (error) {
    return (
      <MainStylized>
        <p
          style={{
            textAlign: "center",
            padding: "2rem",
            fontSize: "1.2rem",
            color: "red",
          }}
        >
          Erro ao carregar artigos: {error.message || "Erro desconhecido."}
        </p>
      </MainStylized>
    );
  }

  // Encontra o artigo mais recente (já que estão ordenados por publishedAt desc)
  const artigoMaisRecente = allArticles.length > 0 ? allArticles[0] : null;

  if (!allArticles || allArticles.length === 0) {
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
          <p
            style={{
              textAlign: "center",
              padding: "2rem",
              fontSize: "1.2rem",
              color: "var(--color-blue)",
            }}
          >
            Nenhum artigo disponível no momento.
          </p>
          <WorkWithUs />
        </MainStylized>
        <Footer />
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
          {/* Renderiza o artigo mais recente se houver */}
          {artigoMaisRecente && (
            <FeaturedArticleCard article={artigoMaisRecente} />
          )}
          {/* Passa todos os artigos para IndexPosts */}
          <IndexPosts articles={allArticles} />
        </BlogMainSection>
        <BlogCardsContainer>
          {/* Mapeia todos os artigos para ArticleCard */}
          {allArticles.map((article) => (
            <ArticleCard
              key={article.id} // Use article.id como key
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
