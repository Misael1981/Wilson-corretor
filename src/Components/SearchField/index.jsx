import styled from "styled-components";
import Tags from "./Tags";
import PropertyTypeSelect from "./PropertyTypeSelect";
import PropertyTypeInput from "./PropertyTypeInput";

const FormStylized = styled.form`
  width: 100%;
`;

const FieldsetStylized = styled.fieldset`
  border: none;
  max-width: 80%;
  margin: 0 auto;
`;

const SearchField = () => {
  return (
    <>
      <FormStylized>
        <FieldsetStylized>
          <Tags />
          <PropertyTypeSelect />
          <PropertyTypeInput />
        </FieldsetStylized>
      </FormStylized>
    </>
  );
};

export default SearchField;
