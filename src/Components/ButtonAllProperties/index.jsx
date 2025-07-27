import styled from "styled-components";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

const ButtonAllPropertiesStylized = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
`;

const ButtonAllProperties = ({ children }) => {
  return (
    <ButtonAllPropertiesStylized>
      <LinkStyled to="/imoveis">
        <Button>{children}</Button>
      </LinkStyled>
    </ButtonAllPropertiesStylized>
  );
};

export default ButtonAllProperties;
