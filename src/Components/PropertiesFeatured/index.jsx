import styled from "styled-components";
import Title from "../Title";
import CardProperty from "./Components/CardProperty";

const PropertiesFeaturedStylized = styled.section`
  width: 95vw;
  min-height: 50vh;
  margin: 2rem auto 20rem;
`;

const ContainerCards = styled.div``;

const PropertiesFeatured = () => {
  return (
    <PropertiesFeaturedStylized>
      <Title>Imóveis em Destaque</Title>
      <ContainerCards>
        <CardProperty />
      </ContainerCards>
    </PropertiesFeaturedStylized>
  );
};

export default PropertiesFeatured;
