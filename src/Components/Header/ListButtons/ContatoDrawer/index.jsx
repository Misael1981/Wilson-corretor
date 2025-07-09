import React, { useState } from "react";
import styled from "styled-components";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";

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

const DrawerContent = styled.ul`
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

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
        <li>
          <a href="https://wa.me/5535999415176text=Olá! Gostaria de mais informações sobre um imóvel." target="_blank" rel="noreferrer">
          <FaWhatsapp />
            035 99941 5176
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/seuinsta"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
            Nos siga nas redes sociais
          </a>
        </li>
        <Link to="/contato"><SiGooglemaps />Ver no mapa</Link>
        <p>Avenida Abreu Lima, 149 - Centro
Pouso Alegre - MG</p>
      </DrawerContent>
    </DrawerWrapper>
  );
};

export default ContatoDrawer;
