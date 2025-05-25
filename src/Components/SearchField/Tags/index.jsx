import styled from "styled-components";

const ContainerBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const Tag = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1rem;
  color: var(--color-blue-ligth);
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-blue-ligth);
`;

const Tags = () => {
  return (
    <ContainerBtns>
      <Tag>Residencial</Tag>
      <Tag>Comercial</Tag>
      <Tag>Outros Tipos</Tag>
    </ContainerBtns>
  );
};

export default Tags;
