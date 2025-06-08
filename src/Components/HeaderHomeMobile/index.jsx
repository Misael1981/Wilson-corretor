import styled from "styled-components";
import HeaderMobileLinkItem from "./HeaderMobileLinkItem";

const HeaderMobileStylStylized = styled.header`
  width: 100%;
  background-color: var(--color-blue);
  position: fixed;
  bottom: 0;
  padding: 0.5rem;
  box-sizing: border-box;
  z-index: 10;
`;

const ListStylized = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderHomeMobile = ({ menuItems, activeSection }) => {
  return (
    <HeaderMobileStylStylized>
      <nav>
        <ListStylized>
          {menuItems.map((item, index) => {
            // VERIFICAÇÃO ADICIONADA AQUI!
            const sectionId = item.href ? item.href.substring(1) : ""; // Se item.href existe, pegue o substring, senão, string vazia
            const isActive = sectionId === activeSection;

            return (
              <HeaderMobileLinkItem
                key={item.href || item.text || index} // Chave mais robusta
                icon={item.icon}
                text={item.text}
                href={item.href}
                onClick={item.onClick} // Passe a prop onClick para o HeaderMobileLinkItem
                isActive={isActive}
              />
            );
          })}
        </ListStylized>
      </nav>
    </HeaderMobileStylStylized>
  );
};

export default HeaderHomeMobile;
