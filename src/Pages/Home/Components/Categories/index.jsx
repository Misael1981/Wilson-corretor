import styled from "styled-components";
import Title from "../../../../Components/Title";
import CardsCategories from "./CardsCategories";
import ButtonAllProperties from "../../../../Components/ButtonAllProperties";

const CategoriesStylized = styled.section`
  width: 90vw;
  margin: 3rem auto 2rem;
`;

const CardsCategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  padding: 2rem;
`;

const categoriesData = [
  { id: 1, type: "casa", title: "Que tal uma casa nova?" },
  { id: 2, type: "apartamento", title: "Ou você prefere um apartamento?" },
  { id: 3, type: "chacara", title: "Uma chácara pra um refúgio merecido?" }, //
  { id: 4, type: "loja", title: "Procurando um imóvel comercial?" }, //
];

const Categories = () => {
  return (
    <CategoriesStylized id="categories">
      <Title>Encontre o imóvel ideal para você</Title>
      <CardsCategoriesContainer>
        {categoriesData.map((category) => (
          <CardsCategories
            key={category.id}
            categoryType={category.type}
            title={category.title}
          />
        ))}
      </CardsCategoriesContainer>
      <ButtonAllProperties>Ver todos os imóveis</ButtonAllProperties>
    </CategoriesStylized>
  );
};

export default Categories;
