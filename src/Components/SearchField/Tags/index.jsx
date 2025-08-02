import styled from "styled-components";

const ContainerBtns = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.button`
  background-color: ${props => props.$active ? 'var(--color-blue)' : 'transparent'};
  border: none;
  font-size: 1rem;
  color: ${props => props.$active ? 'var(--color-golden)' : 'var(--color-blue-ligth)'};
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid ${props => props.$active ? 'var(--color-blue)' : 'var(--color-blue-ligth)'};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: ${props => props.$active ? 'var(--color-golden)' : 'var(--color-blue)'};
    border-color: var(--color-blue);
    background-color: ${props => props.$active ? 'var(--color-blue)' : 'rgba(15, 27, 41, 0.1)'};
  }
`;

const Tags = ({ selectedCategory, onCategorySelect }) => {
  const categories = [
    { label: "Residencial", value: "residencial" },
    { label: "Comercial", value: "comercial" },
    { label: "Outros Tipos", value: "outros" }
  ];

  const handleTagClick = (categoryValue) => {
    // Se a categoria já está selecionada, deseleciona
    if (selectedCategory === categoryValue) {
      onCategorySelect("");
    } else {
      onCategorySelect(categoryValue);
    }
  };

  return (
    <ContainerBtns>
      {categories.map((category) => (
        <Tag
          key={category.value}
          $active={selectedCategory === category.value}
          onClick={() => handleTagClick(category.value)}
          type="button"
        >
          {category.label}
        </Tag>
      ))}
    </ContainerBtns>
  );
};

export default Tags;
