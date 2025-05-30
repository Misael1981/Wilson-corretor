import styled from "styled-components";
import logoSymbol from "/img/logo-simbolo.svg";

const SubTitleStylized = styled.div`
  display: flex;
  align-items: end;
  gap: 0.8rem;
  img {
    width: 4rem;
  }
  h4 {
    font-size: 1.8rem;
    margin: 0;
    font-family: var(--font-title);
    color: var(--color-golden);
  }
`;

const SubTitle = ({ children }) => {
  return (
    <SubTitleStylized>
      <img
        src={logoSymbol}
        alt="Símbolo do logo, um desenho de uma casa e um prédio"
      />
      <h4>{children}</h4>
    </SubTitleStylized>
  );
};

export default SubTitle;
