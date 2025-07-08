import React, { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListPagesStylized = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media screen and (width > 1024px) {
    display: flex;
    gap: 1rem;
  }

  li {
    display: flex;
    flex-direction: column;
    position: relative;
    color: var(--color-golden);
    font-size: 1rem;
    border-bottom: 1px solid #00f0ff;

    @media screen and (width > 1024px) {
      border: none;
      padding: 0;
      &:hover .submenu {
        display: flex;
      }
    }

    .main-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      cursor: pointer;

      @media screen and (width > 1024px) {
        padding: 0.5rem 0;
      }

      button {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--color-golden);
        cursor: pointer;
      }
    }

    .submenu {
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
      background-color: var(--color-blue);
      visibility: hidden;

      &.open {
        max-height: 500px;
        opacity: 1;
        transform: translateY(0);
        padding: 0.5rem 1rem;
        visibility: visible;
      }

      @media screen and (width > 1024px) {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 300px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        z-index: 10;

        li:hover & {
          display: flex;
        }
      }
    }
  }
`;

const LinkStylized = styled(Link)`
  text-decoration: none;
  color: #ccc;
  font-size: 0.95rem;
  padding: 1rem 0;

  &:hover {
    color: white;
  }
`;

const submenuLinks = {
  Home: [
    { text: "Página Principal", to: "/" },
    { text: "Sobre nós", to: "/" },
    { text: "Seja Parceiro", to: "/" },
  ],
  Imóveis: [
    { text: "Casas", to: "/imoveis/casa" },
    { text: "Apartamentos", to: "/imoveis/apartamento" },
    { text: "Imóveis Comerciais", to: "/imoveis/loja" },
    { text: "Sítios", to: "/imoveis/chacara" },
    { text: "Lotes para contrução", to: "/imoveis/casa" },
  ],
  Blog: [
    { text: "Financiamento", to: "/blog" },
    { text: "Empreendimentos", to: "/blog" },
    { text: "Vendas", to: "/blog" },
    { text: "Dicas de Manutenção", to: "/blog" },
  ],
};

const ListPages = ({ onClose }) => {
  const [activeDrawer, setActiveDrawer] = useState(null);
  const pages = Object.keys(submenuLinks);

  const toggleDrawer = (page) => {
    setActiveDrawer((prev) => (prev === page ? null : page));
  };

  return (
    <ListPagesStylized>
      {pages.map((page) => (
        <li key={page}>
          <div className="main-item" onClick={() => toggleDrawer(page)}>
            {page}
            <button aria-label={`Toggle ${page}`}>
              {activeDrawer === page ? (
                <MdKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowRight />
              )}
            </button>
          </div>
          <div
            className={`submenu ${activeDrawer === page ? "open" : ""}`}
            onMouseLeave={() => {
              if (window.innerWidth > 1024) {
                setActiveDrawer(null);
              }
            }}
          >
            {submenuLinks[page].map((sub, i) => (
              <LinkStylized key={i} to={sub.to} onClick={onClose}>
                {sub.text}
              </LinkStylized>
            ))}
          </div>
        </li>
      ))}
    </ListPagesStylized>
  );
};

export default ListPages;
