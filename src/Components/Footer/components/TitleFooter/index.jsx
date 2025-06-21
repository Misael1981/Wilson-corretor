import styled from "styled-components";

const TitleFooterStylized = styled.h3`
  font-family: var(--font-title);
  color: var(--color-golden);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const TitleFooter = ({ children }) => {
  return <TitleFooterStylized>{children}</TitleFooterStylized>;
};

export default TitleFooter;
