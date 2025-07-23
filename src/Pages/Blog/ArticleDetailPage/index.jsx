import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../Components/Footer";
// Removido: import Article from "../components/Article"; // Não precisamos mais se o código estiver aqui
import IndexPosts from "../components/IndexPosts";
import styled from "styled-components";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import ReactMarkdown from "react-markdown"; // Importa ReactMarkdown aqui
import { format } from "date-fns"; // Importa date-fns aqui
import { ptBR } from "date-fns/locale"; // Importa locale pt-BR aqui

// Importações do Firestore
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase"; // Importa a instância do db

const ContainerArticlesStylized = styled.div`
  width: 100%;
  margin: 2rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Styled Components para o layout do artigo (MOVIDOS PARA CÁ, ANTES ESTAVAM NO Article.jsx)
const ArticleContainer = styled.div`
  flex: 2; /* Ocupa mais espaço na tela */
  max-width: 700px; /* Largura máxima para o conteúdo principal */
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: "Inter", sans-serif;
  line-height: 1.6;
  color: #333;

  @media (max-width: 768px) {
    max-width: 95vw;
    padding: 1rem;
  }
`;

const ArticleTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--color-blue, #0f1e2e);
  margin-bottom: 0.8rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ArticleMeta = styled.div`
  text-align: center;
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
`;

const ArticleImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Estilos para o conteúdo Markdown renderizado (importante para o ReactMarkdown)
const MarkdownContent = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--color-blue, #0f1e2e);
    margin-top: 1.5em;
    margin-bottom: 0.8em;
  }

  p {
    margin-bottom: 1em;
  }

  ul,
  ol {
    margin-left: 1.5em;
    margin-bottom: 1em;
  }

  a {
    color: var(--color-golden, #f39c12);
    text-decoration: underline;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  blockquote {
    border-left: 4px solid var(--color-golden, #f39c12);
    padding-left: 1em;
    margin: 1em 0;
    color: #555;
    font-style: italic;
  }

  pre {
    background-color: #f4f4f4;
    padding: 1em;
    border-radius: 0.5em;
    overflow-x: auto;
  }

  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
      monospace;
    background-color: #e0e0e0;
    padding: 0.2em 0.4em;
    border-radius: 0.3em;
  }
`;

const ArticleDetailPage = () => {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleAndAllArticles = async () => {
      setLoading(true);
      setError(null);
      let fetchedArticle = null;
      let fetchedAllArticles = [];

      try {
        const articleDocRef = doc(db, "articles", id);
        const articleSnapshot = await getDoc(articleDocRef);

        if (articleSnapshot.exists()) {
          fetchedArticle = {
            id: articleSnapshot.id,
            ...articleSnapshot.data(),
          };
        } else {
          const qBySlug = query(
            collection(db, "articles"),
            where("slug", "==", id),
            limit(1)
          );
          const slugQuerySnapshot = await getDocs(qBySlug);

          if (!slugQuerySnapshot.empty) {
            const docFoundBySlug = slugQuerySnapshot.docs[0];
            fetchedArticle = {
              id: docFoundBySlug.id,
              ...docFoundBySlug.data(),
            };
          }
        }

        if (!fetchedArticle || fetchedArticle.status !== "published") {
          setError(new Error("Artigo não encontrado ou não publicado."));
          setLoading(false);
          return;
        }

        setArticle(fetchedArticle);

        const allArticlesQuery = query(
          collection(db, "articles"),
          where("status", "==", "published"),
          where("publishedAt", "!=", null), // Garante que publishedAt não é null
          orderBy("publishedAt", "desc")
        );
        const allArticlesSnapshot = await getDocs(allArticlesQuery);

        fetchedAllArticles = allArticlesSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((art) => art.id !== fetchedArticle.id);

        setAllArticles(fetchedAllArticles);
      } catch (err) {
        console.error(
          "Erro ao carregar artigo ou lista de artigos para detalhes:",
          err
        );
        setError(
          new Error(
            `Não foi possível carregar o artigo ou a lista de artigos. Detalhes: ${err.message}`
          )
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticleAndAllArticles();
  }, [id]);

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

  // Formata a data de publicação DENTRO DESTE COMPONENTE
  const formattedDate =
    article && article.publishedAt && article.publishedAt.seconds
      ? format(new Date(article.publishedAt.seconds * 1000), "dd/MM/yyyy", {
          locale: ptBR,
        })
      : "N/A";

  return (
    <>
      <Breadcrumbs />
      <main>
        <ContainerArticlesStylized>
          {/* Renderiza o conteúdo do artigo diretamente aqui */}
          <ArticleContainer>
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleMeta>
              Por {article.author} em {formattedDate} | Categoria:{" "}
              {article.category}
              {article.tags && article.tags.length > 0 && (
                <span> | Tags: {article.tags.join(", ")}</span>
              )}
            </ArticleMeta>
            {article.imageUrl && (
              <ArticleImage src={article.imageUrl} alt={article.title} />
            )}
            <MarkdownContent>
              {/* ESTA É A LINHA CRÍTICA: Passa article.content diretamente para ReactMarkdown */}
              {article.content && (
                <ReactMarkdown>{article.content}</ReactMarkdown>
              )}
            </MarkdownContent>
          </ArticleContainer>
          {/* Fim do conteúdo do artigo */}

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
