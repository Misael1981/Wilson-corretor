import React from "react"; // Sempre bom importar React
import TitleFooter from "../TitleFooter";
import logoDev from "../../assets/logo-developer.svg";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import styled from "styled-components";

const CardDevStylized = styled.div`
  text-align: center;
`;

const ImageDev = styled.img`
  width: 12rem;
  margin: 2rem auto 0;
  display: block;
`;

const LinksDevStylized = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  list-style: none;
  margin: 0;
`;

const LinkDevStylized = styled.a`
  text-decoration: none;
  color: #ccc;
  font-size: 2.8rem;
  transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: var(--color-golden);
    transform: translateY(-5px) scale(1.2);
    text-shadow: 0 10px 15px rgba(255, 215, 0, 0.7);
  }

  &:active,
  &:focus {
    transform: translateY(0) scale(0.95);
    color: var(--color-golden-dark);
    outline: none;
  }
`;

const CardDev = () => {
  const linksDev = [
    {
      href: "https://github.com/Misael1981",
      element: <FaGithub />,
      label: "GitHub do Desenvolvedor",
    },
    {
      href: "https://www.linkedin.com/in/misael-borges-dev/",
      element: <FaLinkedin />,
      label: "LinkedIn do Desenvolvedor",
    },
    {
      href: "https://wa.me/5535999110933",
      element: <FaWhatsapp />,
      label: "WhatsApp do Desenvolvedor",
    },
  ];
  return (
    <CardDevStylized>
      <TitleFooter>Desenvolvido por:</TitleFooter>
      <ImageDev src={logoDev} alt="Logo do Desenvolvedor da página" />
      <LinksDevStylized>
        {linksDev.map((link, index) => (
          <li key={index}>
            <LinkDevStylized
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              {link.element}
            </LinkDevStylized>
          </li>
        ))}
      </LinksDevStylized>
    </CardDevStylized>
  );
};

export default CardDev;
