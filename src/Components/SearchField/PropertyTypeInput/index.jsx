import styled from "styled-components";

const ContainerInput = styled.div`
  flex: 3;
`;

const LabelStylezed = styled.label`
  display: block;
  text-align: start;
  color: var(--color-blue);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const InputStylezed = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem;
  font-size: 1rem;
  color: var(--color-blue);
  border-radius: 0.5rem;
  border: none;

  &::placeholder {
    font-size: 0.8rem; /* Tamanho da fonte MENOR para o placeholder */
    color: #999; /* Opcional: Mudar a cor do placeholder para algo mais suave */
  }
`;

const PropertyTypeInput = ({ value, onChange }) => {
  return (
    <ContainerInput>
      <LabelStylezed>Onde deseja morar?</LabelStylezed>
      <InputStylezed
        value={value}
        onChange={onChange}
        id="property-type-input"
        type="text"
        placeholder="Digite o nome do bairro ou cidade"
      />
    </ContainerInput>
  );
};

export default PropertyTypeInput;
