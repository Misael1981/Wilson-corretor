import styled from "styled-components";

const StyledItemHome = styled.li`
  background-color: transparent;
`;

const StyledLinkItem = styled.a`
  color: #ccc;
  font-size: 1.7rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: color 0.3s ease;

  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  cursor: pointer;

  span {
    font-family: var(--font-title);
    font-size: 0.8rem;
  }

  svg {
    font-size: 1.7rem;
  }

  ${(props) =>
    props.$isActive &&
    `
    color: var(--color-golden); /* Exemplo: Cor dourada para o ativo */
    font-weight: bold;
    border-bottom: 2px solid var(--color-golden); /* Linha embaixo do item ativo */
    span {
      color: var(--color-golden);
    }
  `}
`;

const HeaderMobileLinkItem = ({
  icon: Icon,
  text,
  href,
  isActive,
  onClick,
}) => {
  return (
    <StyledItemHome>
      {href ? (
        <StyledLinkItem href={href} $isActive={isActive}>
          {Icon && <Icon />}
          <span>{text}</span>
        </StyledLinkItem>
      ) : (
        <StyledLinkItem
          as="button"
          onClick={onClick}
          $isActive={isActive}
          $isClickable={true}
        >
          {Icon && <Icon />}
          <span>{text}</span>
        </StyledLinkItem>
      )}
    </StyledItemHome>
  );
};

export default HeaderMobileLinkItem;
