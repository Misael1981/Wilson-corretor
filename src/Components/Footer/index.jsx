import styled from "styled-components";
import minhaLogo from "./assets/minha-logo-branca.svg";
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";

const FooterStylized = styled.footer`
  width: 100%;
  min-height: 20rem;
  background: var(--degrade-blue);
  box-sizing: border-box;
  padding: 1rem 2rem 4rem;

  @media screen and (width > 1020px) {
    padding: 1rem 2rem 0;
  }
`;

const TitleFooterStylized = styled.div`
  color: #ccc;
  font-family: var(--font-title);
  font-size: 1.5rem;
  margin-bottom: 3rem;
`;

const ContainerContactDevStylized = styled.div`
  width: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const FooterImageDevStylized = styled.img`
  width: 10rem;
  height: auto;
`;

const FooterListContactDevStylized = styled.ul`
  width: 12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    color: #ccc;
    font-size: 2rem;
  }
`;

const FooterContentStylized = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: #ccc;
    font-size: 1rem;
  }
`;

const Footer = () => {
  return (
    <FooterStylized>
      <TitleFooterStylized>
        <h3>Desenvolvido por:</h3>
      </TitleFooterStylized>
      <FooterContentStylized>
        <ContainerContactDevStylized>
          <FooterImageDevStylized
            src={minhaLogo}
            alt="Logo do desenvolvedor Misael Borges"
          />
          <FooterListContactDevStylized>
            <li>
              <a href="#">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a href="#">
                <FaGithub />
              </a>
            </li>
            <li>
              <a href="#">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="#">
                <FaWhatsapp />
              </a>
            </li>
          </FooterListContactDevStylized>
        </ContainerContactDevStylized>
        <p>&copy; 2025. Todos os direitos reservados.</p>
      </FooterContentStylized>
    </FooterStylized>
  );
};

export default Footer;
