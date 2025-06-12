import styled from "styled-components";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

const ButtonAllPropertiesStylized = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

const ButtonAllProperties = ({ children }) => {
  return (
    <ButtonAllPropertiesStylized>
      <Link to="/imoveis">
        <Button>{children}</Button>
      </Link>
    </ButtonAllPropertiesStylized>
  );
};

export default ButtonAllProperties;
