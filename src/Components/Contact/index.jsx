import styled from "styled-components";
import logoEssenza from "./assets/logo-essenza-Photoroom.png";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { RiMapPinRangeFill } from "react-icons/ri";
import ContactBackground from "./assets/reuniao-essenza.jpg";
import MapLocation from "./MapLocation";
import Title from "../Title";

const ContactStylized = styled.section`
  width: 100%;
  min-height: 20rem;
  margin-bottom: 2rem;
  height: auto;
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: auto;

  @media screen and (min-width: 1020px) {
    flex-direction: row;
    align-items: stretch;
    height: 600px;
  }
`;

const ContactContent = styled.div`
  flex: 1;
  width: 100%;
  background-image: linear-gradient(rgba(4, 13, 24, 0.4), rgba(2, 9, 19, 0.4)),
    ${`url(${ContactBackground})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 1rem;
  box-sizing: border-box;
  min-height: 400px;

  @media screen and (min-width: 1020px) {
    min-height: unset;
    height: 100%;
  }
`;

const MapContainerForMapLocation = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px;
  height: 40vh;

  @media screen and (min-width: 1020px) {
    min-height: unset;
    height: 100%;
  }
`;

const ContactHeader = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  color: #ccc;
  text-align: center;

  img {
    width: 12rem;
    height: auto;
  }
  h5 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--color-blue);
    font-family: var(--font-title);
    font-weight: 700;
  }
  p {
    font-size: 1.2rem;
  }
`;

const ContainerMidiasAndLocation = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem; /* Adicionado para separar do header */

  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #ccc;
    margin-bottom: 0.8rem;
    text-align: center;
  }
`;

const ContactMidias = styled.div`
  font-size: 1.2rem;

  ul {
    /* Adicionado estilos para a ul */
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: #ccc;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.3rem;

    svg {
      font-size: 1.5rem;
    }
  }
`;

const ContactLocation = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: #ccc;

  svg {
    font-size: 2.5rem;
  }
  div {
    display: flex;
    align-items: center; /* Alinha o ícone com o texto */
    gap: 0.5rem; /* Espaço entre o ícone e o endereço */
  }
`;

const Contact = () => {
  return (
    <ContactStylized id="contact">
      <Title>Contato</Title>
      <ContactContainer>
        <ContactContent>
          <ContactHeader>
            <img src={logoEssenza} alt="Logo da Essenza Imobiliária" />
            <h5>A sua imobiliária em Pouso Alegre</h5>
            <p>Os melhores imóveis em Pouso Alegre e região em um só lugar</p>
          </ContactHeader>
          <ContainerMidiasAndLocation>
            <ContactMidias>
              <h3>Entre em contato</h3>
              <ul>
                <li>
                  <a
                    href="https://wa.me/5535999415176"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    {/* Links reais */}
                    <FaWhatsapp />
                    (35) 99941 5176
                  </a>
                </li>
                <li>
                  <a href="mailto:seuemailaqui@email.com">
                    {" "}
                    {/* Links reais */}
                    <MdMailOutline />
                    seuemailaqui@email.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/seuperfil"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    {/* Links reais */}
                    <FaInstagram />
                    Nos siga no Instagram
                  </a>
                </li>
              </ul>
            </ContactMidias>
            <ContactLocation>
              <h3>Onde estamos</h3>
              <div>
                <RiMapPinRangeFill />
                <address>
                  Avenida Abreu Lima, 149 - Centro <br />
                  Pouso Alegre - MG <br />
                </address>
              </div>
            </ContactLocation>
          </ContainerMidiasAndLocation>
        </ContactContent>
        {/* Usando o Styled Component renomeado para evitar conflito */}
        <MapContainerForMapLocation>
          <MapLocation />
        </MapContainerForMapLocation>
      </ContactContainer>
    </ContactStylized>
  );
};

export default Contact;
