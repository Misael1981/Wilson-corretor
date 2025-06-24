import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SectionStylized = styled.section`
  width: 18rem;
  max-width: 90vw;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 0.8rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TitleH3 = styled.h3`
  font-family: var(--font-title);
  color: var(--color-blue);
  text-align: center;
  margin-bottom: 1rem;
`;

const UlStylized = styled.ul`
  list-style: none;
  padding: 0;
`;

const LiStylized = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px dashed #eee;
  color: var(--color-dark-gray);
  font-size: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

const LinkStylized = styled(Link)`
  text-decoration: none;
  color: var(--color-blue);
  transition: 0.3s;

  &:hover {
    color: orange;
  }
`;

const IndexPosts = ({ articles }) => {
  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return (
      <SectionStylized>
        <TitleH3>Posts Recentes</TitleH3>
        <p style={{ textAlign: "center", color: "var(--color-gray)" }}>
          Nenhum post recente disponível.
        </p>
      </SectionStylized>
    );
  }

  return (
    <SectionStylized>
      <TitleH3>Posts Recentes</TitleH3>
      <UlStylized>
        {articles.map((article) => (
          <LiStylized key={article.id}>
            <LinkStylized to={`/blog/${article.slug || article.id}`}>
              {article.title}
            </LinkStylized>
          </LiStylized>
        ))}
      </UlStylized>
    </SectionStylized>
  );
};

export default IndexPosts;
