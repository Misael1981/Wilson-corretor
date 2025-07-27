import React from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

const BreadcrumbsContainer = styled.nav`
  padding: 1rem;
  background-color: #f0eaea;
  border-bottom: 1px solid var(--color-blue-ligth);
  font-size: 0.9rem;
  color: var(--color-blue);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap; /* Para garantir que não quebre em telas pequenas */

  a {
    color: var(--color-blue);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: var(--color-gray);
  }
`;

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x); // Divide o caminho e remove strings vazias

  // Mapeamento para traduzir segmentos da URL para nomes mais amigáveis
  const pathSegmentMap = {
    imoveis: "Imóveis",
    imovel: "Detalhes do Imóvel", // Para a rota /imovel/:id
    casa: "Casas",
    apartamento: "Apartamentos",
    chacara: "Chácaras",
    loja: "Lojas/Comerciais",
    terreno: "Terrenos",
    outros: "Outros Tipos",
    admin: "Administração",
  };

  return (
    <BreadcrumbsContainer>
      <Link to="/">Home</Link>
      {/* NOVO LINK AQUI: Para a página de todos os imóveis */}
      {location.pathname !== "/imoveis" &&
        location.pathname !== "/" && ( // Só mostra se não estiver já na home ou na página de todos os imóveis
          <>
            <span> / </span>
            <Link to="/imoveis">Todos os Imóveis</Link>
          </>
        )}

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        // Tenta traduzir o nome do segmento
        let displayName = pathSegmentMap[name] || name.replace(/-/g, " ");

        // Lógica específica para o ID do imóvel na rota /imovel/:id
        if (
          name.length > 10 &&
          index === pathnames.length - 1 &&
          pathnames[index - 1] === "imovel"
        ) {
          displayName = "Imóvel"; // Ou 'Detalhes' ou 'ID do Imóvel'
        }

        // Evita duplicar "Imóveis" se já estiver na rota /imoveis/:category
        if (name === "imoveis" && index === 0 && pathnames.length > 1) {
          return null; // Não renderiza "Imóveis" se já tivermos um link "Todos os Imóveis" e for uma subcategoria
        }

        return isLast ? (
          <span key={name}> / {displayName}</span>
        ) : (
          <span key={name}>
            {" "}
            / <Link to={routeTo}>{displayName}</Link>
          </span>
        );
      })}
    </BreadcrumbsContainer>
  );
};

export default Breadcrumbs;
