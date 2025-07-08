import React, { useState } from "react";
import styled from "styled-components";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const DrawerWrapper = styled.div`
  width: 100%;

  @media screen and (width > 1024px) {
    width: 6rem;
    position: relative;
  }
`;

const TriggerButton = styled.button`
  background-color: transparent;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 1rem;
  color: var(--color-golden);
  border: none;
  border-bottom: 1px solid #00f0ff;
  padding: 1.5rem 1rem 1rem;
  cursor: pointer;

  @media screen and (width > 1024px) {
    padding: 0.5rem 0;
    border: none;
  }

  svg {
    font-size: 1.5rem;
    padding-right: 0.5rem;
  }
`;

const DrawerContent = styled.div`
  overflow: hidden;
  max-height: ${({ open }) => (open ? "500px" : "0")};
  opacity: ${({ open }) => (open ? "1" : "0")};
  transform: translateY(${({ open }) => (open ? "0" : "-10px")});
  transition: all 0.3s ease;
  padding: ${({ open }) => (open ? "1rem" : "0 1rem")};
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background-color: var(--color-blue);

  a,
  p {
    color: #ccc;
    font-size: 0.95rem;
    text-decoration: none;
  }

  a:hover {
    color: white;
  }

  @media screen and (width > 1024px) {
    position: absolute;
    top: 100%;
    right: -100px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }
`;

const ContatoDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  return (
    <DrawerWrapper>
      <TriggerButton onClick={toggleDrawer}>
        Contato {isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
      </TriggerButton>

      <DrawerContent open={isOpen}>
        <a href="https://wa.me/5599999999999" target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a
          href="https://instagram.com/seuinsta"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <Link to="/contato">Página de Contato</Link>
        <p>Rua Tal, 123 - Bairro X - Cidade</p>
      </DrawerContent>
    </DrawerWrapper>
  );
};

export default ContatoDrawer;
