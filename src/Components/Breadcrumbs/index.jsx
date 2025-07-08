import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import styled from "styled-components";
// Supondo que você tem um mock de dados ou um contexto com todos os artigos/imóveis
// import { allArticlesData, allPropertiesData } from '../../data/mockData';

const BreadcrumbContainer = styled.nav`
  padding: 1rem;
  background-color: var(--color-light-gray);
  color: var(--color-dark-gray);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* Para quebrar linha em telas pequenas */

  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }

  li {
    display: flex;
    align-items: center;
    &:not(:last-child)::after {
      content: "›"; /* Separador */
      margin: 0 0.5rem;
      color: var(--color-gray);
    }
  }

  a {
    color: var(--color-blue);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  span {
    font-weight: bold;
    color: var(--color-blue-dark);
  }
`;

// Helper function (simulando busca por título)
// No seu projeto real, isso viria de seu useFetch/Firebase
const getTitleBySlugOrId = (segment, allArticles, allProperties) => {
  // Lógica para o blog
  if (segment.startsWith("blog") && allArticles) {
    // Se o segmento for 'blog', retorna 'Blog'
    if (segment === "blog") return "Blog";
    // Se for um slug/id de artigo, procura o título correspondente
    const article = allArticles.find(
      (art) =>
        String(art.id) === String(segment) ||
        String(art.slug) === String(segment)
    );
    return article ? article.title : segment; // Retorna o título do artigo ou o slug se não encontrar
  }

  // Lógica para imóveis (exemplo)
  if (segment.startsWith("imoveis") && allProperties) {
    if (segment === "imoveis") return "Imóveis";
    // Lógica para categorias de imóveis ou IDs de imóveis específicos
    // Ex: const property = allProperties.find(...)
    // Ou um mapa de slugs para nomes de categorias: { 'apartamentos': 'Apartamentos', 'casas': 'Casas' }
    return (
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    ); // Capitaliza e substitui hífens
  }

  // Caso padrão para outros segmentos ou o Home
  if (segment === "") return "Home"; // Para o primeiro item que é sempre vazio
  return segment.charAt(0).toUpperCase() + segment.slice(1); // Capitaliza a primeira letra
};

const Breadcrumbs = () => {
  const location = useLocation();
  const params = useParams(); // Para pegar os IDs/slugs
  const pathnames = location.pathname.split("/").filter((x) => x); // Divide a URL em segmentos

  // ATENÇÃO: No seu projeto, você provavelmente já terá allArticles e allProperties disponíveis
  // Seja via um Context API, ou chamadas useFetch no componente pai que passa pra cá.
  // Por simplicidade aqui, vou apenas simular.
  const [allArticles, setAllArticles] = useState([]); // Simule o carregamento dos seus artigos
  const [allProperties, setAllProperties] = useState([]); // Simule o carregamento dos seus imóveis

  useEffect(() => {
    // Isso é apenas um exemplo de como você carregaria seus dados
    // No seu caso, use o useFetch ou o estado global do Redux/ContextAPI
    // Se seus dados já são carregados globalmente, remova este useEffect.
    const loadMockData = async () => {
      try {
        const blogResponse = await fetch("/blogArticles.json");
        const blogData = await blogResponse.json();
        setAllArticles(blogData);

        // Exemplo: se você tivesse um /properties.json
        // const propResponse = await fetch('/properties.json');
        // const propData = await propResponse.json();
        // setAllProperties(propData);
      } catch (err) {
        console.error("Erro ao carregar dados para breadcrumb:", err);
      }
    };
    loadMockData();
  }, []);

  return (
    <BreadcrumbContainer>
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          // Tenta obter o título amigável para o segmento
          // Note que getTitleBySlugOrId é uma função de exemplo,
          // sua lógica real pode ser mais sofisticada.
          const displayedName = getTitleBySlugOrId(
            name,
            allArticles,
            allProperties
          );

          return (
            <li key={name}>
              {isLast ? (
                <span>{displayedName}</span>
              ) : (
                <Link to={routeTo}>{displayedName}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </BreadcrumbContainer>
  );
};

export default Breadcrumbs;
