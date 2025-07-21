import styled from "styled-components";
import paginaEmConstrucao from "/img/pagina-em-construcao.webp";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 70%;
    height: auto;
  }
`;

const SettingsAdmin = () => {
  return (
    <Container>
      <img src={paginaEmConstrucao} alt="" />
    </Container>
  );
};

export default SettingsAdmin;
