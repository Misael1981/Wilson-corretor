import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (min-width: 1025px) and (max-width: 1225px) {
    justify-content: flex-end;
  }
`;

const SearchIconButton = styled.button`
  background: none;
  border: none;
  color: #d4af7f;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (min-width: 1226px), (max-width: 1024px) {
    display: none;
  }
`;

const SearchInputWrapper = styled.div`
  display: flex;
  border: 1px solid #d4af7f;
  border-radius: 4px;
  overflow: hidden;
  transition: width 0.3s ease;
  background-color: #0f1e2e;

  @media (min-width: 1025px) and (max-width: 1225px) {
    width: ${({ expanded }) => (expanded ? "250px" : "0")};
    opacity: ${({ expanded }) => (expanded ? "1" : "0")};
    visibility: ${({ expanded }) => (expanded ? "visible" : "hidden")};
    margin-left: 0.5rem;
  }

  @media (max-width: 1024px), (min-width: 1226px) {
    width: 300px;
    opacity: 1;
    visibility: visible;
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  padding: 0.5rem;
  color: #fff;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #ccc;
  }
`;

const SearchButton = styled.button`
  background-color: #d4af7f;
  border: none;
  color: #0f1e2e;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;

  clip-path: polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%);
`;

const ResponsiveSearch = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);

  return (
    <SearchContainer>
      <SearchIconButton onClick={handleToggle}>
        <FaSearch />
      </SearchIconButton>

      <SearchInputWrapper expanded={expanded}>
        <SearchInput placeholder="O que você procura?" />
        <SearchButton>Pesquisar</SearchButton>
      </SearchInputWrapper>
    </SearchContainer>
  );
};

export default ResponsiveSearch;
