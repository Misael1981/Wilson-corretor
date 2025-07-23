import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Title from "../../../../Components/Title";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";

const MiniBlogStylized = styled.section`
  width: 100%;
  max-width: 95vw;
  height: auto;
  margin: 2rem auto;
`;

const SubTitleBlog = styled.h6`
  text-align: center;
  font-size: 1.5rem;
  max-width: 80vw;
  margin: 0 auto;
  color: var(--color-blue);
`;

const ContainerBlogs = styled.div`
  width: 100%;
  max-width: 75rem;
  box-sizing: border-box;
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
`;

const ContainerFinancial = styled.div`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
`;

const OpportunitiesStylized = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
`;

const ContainerMaintenance = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

// CORREÇÃO AQUI: Use $backgroundImageUrl para a prop
const Blog = styled(Link)`
  flex: 1;
  width: 20rem;
  max-width: 90vw;
  min-height: 15rem;
  padding: 1rem;
  border: 1px solid var(--color-golden);
  border-radius: 1rem;
  background-image: linear-gradient(
      rgba(15, 27, 41, 0.4),
      rgba(15, 27, 41, 0.4)
    ),
    url(${(props) => props.$backgroundImageUrl}); /* Use $backgroundImageUrl aqui */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  transition: transform 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1.5rem;
  }
  h4 {
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }
`;

const MiniBlog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const articlesCollectionRef = collection(db, "articles");
        const q = query(
          articlesCollectionRef,
          where("status", "==", "published"),
          orderBy("publishedAt", "desc"),
          limit(4)
        );
        const querySnapshot = await getDocs(q);

        const fetchedArticles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setArticles(fetchedArticles);
      } catch (err) {
        console.error("Erro ao carregar artigos para MiniBlog:", err);
        setError("Não foi possível carregar os artigos do blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const financialArticle = articles[0];
  const venturesArticle = articles[1];
  const salesArticle = articles[2];
  const maintenanceArticle = articles[3];

  if (loading) {
    return (
      <MiniBlogStylized>
        <p style={{ textAlign: "center", color: "var(--color-blue)" }}>
          Carregando artigos do blog...
        </p>
      </MiniBlogStylized>
    );
  }

  if (error) {
    return (
      <MiniBlogStylized>
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      </MiniBlogStylized>
    );
  }

  const placeholderArticle = {
    id: "placeholder",
    slug: "em-breve",
    imageUrl: "https://placehold.co/400x250/cccccc/333333?text=Em+Breve",
    title: "Em Breve",
    summary: "Mais conteúdo interessante chegando em breve!",
  };

  return (
    <MiniBlogStylized>
      <div>
        <Title>Explore</Title>
        <SubTitleBlog>
          Uma seleção de conteúdos que simplificam sua jornada de compra, venda
          ou manutenção dos seus imóveis
        </SubTitleBlog>
      </div>
      <ContainerBlogs>
        <ContainerFinancial>
          {financialArticle ? (
            <Blog
              to={`/blog/${financialArticle.slug || financialArticle.id}`}
              key={financialArticle.id}
              $backgroundImageUrl={
                financialArticle.imageUrl || placeholderArticle.imageUrl
              } /* Use $backgroundImageUrl aqui */
            >
              <h3>{financialArticle.title || "Sem Título"}</h3>
              <h4>{financialArticle.summary || "Sem resumo"}</h4>
            </Blog>
          ) : (
            <Blog
              to={`/blog/${placeholderArticle.slug}`}
              key={placeholderArticle.id + "-1"}
              $backgroundImageUrl={
                placeholderArticle.imageUrl
              } /* Use $backgroundImageUrl aqui */
            >
              <h3>{placeholderArticle.title}</h3>
              <h4>{placeholderArticle.summary}</h4>
            </Blog>
          )}
          <OpportunitiesStylized>
            {venturesArticle ? (
              <Blog
                to={`/blog/${venturesArticle.slug || venturesArticle.id}`}
                key={venturesArticle.id}
                $backgroundImageUrl={
                  venturesArticle.imageUrl || placeholderArticle.imageUrl
                } /* Use $backgroundImageUrl aqui */
              >
                <h3>{venturesArticle.title || "Sem Título"}</h3>
                <h4>{venturesArticle.summary || "Sem resumo"}</h4>
              </Blog>
            ) : (
              <Blog
                to={`/blog/${placeholderArticle.slug}`}
                key={placeholderArticle.id + "-2"}
                $backgroundImageUrl={
                  placeholderArticle.imageUrl
                } /* Use $backgroundImageUrl aqui */
              >
                <h3>{placeholderArticle.title}</h3>
                <h4>{placeholderArticle.summary}</h4>
              </Blog>
            )}
            {salesArticle ? (
              <Blog
                to={`/blog/${salesArticle.slug || salesArticle.id}`}
                key={salesArticle.id}
                $backgroundImageUrl={
                  salesArticle.imageUrl || placeholderArticle.imageUrl
                } /* Use $backgroundImageUrl aqui */
              >
                <h3>{salesArticle.title || "Sem Título"}</h3>
                <h4>{salesArticle.summary || "Sem resumo"}</h4>
              </Blog>
            ) : (
              <Blog
                to={`/blog/${placeholderArticle.slug}`}
                key={placeholderArticle.id + "-3"}
                $backgroundImageUrl={
                  placeholderArticle.imageUrl
                } /* Use $backgroundImageUrl aqui */
              >
                <h3>{placeholderArticle.title}</h3>
                <h4>{placeholderArticle.summary}</h4>
              </Blog>
            )}
          </OpportunitiesStylized>
        </ContainerFinancial>
        <ContainerMaintenance>
          {maintenanceArticle ? (
            <Blog
              to={`/blog/${maintenanceArticle.slug || maintenanceArticle.id}`}
              key={maintenanceArticle.id}
              $backgroundImageUrl={
                maintenanceArticle.imageUrl || placeholderArticle.imageUrl
              } /* Use $backgroundImageUrl aqui */
            >
              <h3>{maintenanceArticle.title || "Sem Título"}</h3>
              <h4>{maintenanceArticle.summary || "Sem resumo"}</h4>
            </Blog>
          ) : (
            <Blog
              to={`/blog/${placeholderArticle.slug}`}
              key={placeholderArticle.id + "-4"}
              $backgroundImageUrl={
                placeholderArticle.imageUrl
              } /* Use $backgroundImageUrl aqui */
            >
              <h3>{placeholderArticle.title}</h3>
              <h4>{placeholderArticle.summary}</h4>
            </Blog>
          )}
        </ContainerMaintenance>
      </ContainerBlogs>
    </MiniBlogStylized>
  );
};

export default MiniBlog;
