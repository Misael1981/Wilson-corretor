import styled from "styled-components";

const StyledItemHome = styled.li`
  background-color: transparent;
`;

const StyledLinkItem = styled.a`
  color: #ccc; /* Cor padrão */
  font-size: 1.7rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: color 0.3s ease; /* Adicionar transição para suavidade */

  // ESTILOS PARA RESETAR O BOTÃO
  background: none; /* Remove o background padrão do botão */
  border: none; /* Remove a borda padrão do botão */
  padding: 0; /* Remove o padding padrão do botão */
  margin: 0; /* Remove a margem padrão do botão */
  font: inherit; /* Faz com que o botão herde a fonte do elemento pai */
  cursor: pointer; /* Garante que o cursor seja de ponteiro para indicar clicável */

  span {
    font-family: var(--font-title);
    font-size: 0.8rem;
  }

  svg {
    font-size: 1.7rem; /* Tamanho do ícone */
  }

  // Estilização condicional para o estado ativo
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
      {/* Condicionalmente renderiza um 'a' com href ou um 'button'/'div' com onClick */}
      {href ? ( // Se tiver href, renderiza como link normal
        <StyledLinkItem href={href} $isActive={isActive}>
          {Icon && <Icon />}
          <span>{text}</span>
        </StyledLinkItem>
      ) : (
        // Se não tiver href, e tiver onClick, renderiza como algo clicável
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
