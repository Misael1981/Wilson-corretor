import styled from "styled-components";
import CardTags from "./components/CardTags";
import CardDev from "./components/CardDev";

const FooterStylized = styled.footer`
  width: 100%;
  background: var(--degrade-blue);
  padding-bottom: 4rem;

  @media screen and (width > 1020px) {
    padding: 0;
  }
`;

const FooterContainer = styled.div`
  max-width: 95vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const ContentFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 2rem;

  /* @media screen and (width > 1020px) {
    flex-direction: row;

    p {
      align-self: flex-end;
    }
  } */

  p {
    color: #ccc;
    font-size: 1rem;
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <FooterStylized>
      <FooterContainer>
        <CardTags />
        <ContentFooter>
          <CardDev />
          <p>
            &copy; 2025{" "}
            <strong>Misael Borges - Desenvolvedor full-stack</strong>. Proibida
            a reprodução total ou parcial sem autorização.
          </p>
        </ContentFooter>
      </FooterContainer>
    </FooterStylized>
  );
};

export default Footer;
