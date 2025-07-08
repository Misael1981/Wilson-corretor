import styled from "styled-components";
import Tags from "./Tags";
import PropertyTypeSelect from "./PropertyTypeSelect";
import PropertyTypeInput from "./PropertyTypeInput";
import Button from "../Button";

const FormStylized = styled.form`
  width: 100%;
`;

const FieldsetStylized = styled.fieldset`
  border: none;
  max-width: 80%;
  margin: 0 auto;
`;

const ContainerSearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 0;

  @media screen and (width > 1020px) {
    flex-direction: row;
    align-items: end;
  }
`;

const SearchField = () => {
  return (
    <>
      <FormStylized>
        <FieldsetStylized>
          <Tags />
          <ContainerSearch>
            <PropertyTypeSelect />
            <PropertyTypeInput />
            <Button>Buscar</Button>
          </ContainerSearch>
        </FieldsetStylized>
      </FormStylized>
    </>
  );
};

export default SearchField;
