import styled from "styled-components";
import LogoHorizontal from "/img/logo-horizontal.svg";

const HeaderStylized = styled.header`
  position: sticky;
  top: 0;
  background-color: #0f1b29;
  width: 100%;
  padding: 0.5rem 0;
  z-index: 1000;
`;

const NavStylized = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;

  img {
    width: 12rem;
  }
`;

const ListStylized = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
`;

const LinkStylized = styled.a`
  text-decoration: none;
  color: #ccc;
  font-family: var(--font-title);
  font-size: 1.5rem;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-golden);
  }

  ${(props) =>
    props.$isActive &&
    `
    color: var(--color-golden); /* Cor dourada para o ativo (prioridade) */
    border-bottom: 5px solid var(--color-golden); /* Linha embaixo do link ativo */
  `}
`;

const HeaderHome = ({ menuItems, activeSection }) => {
  return (
    <>
      <HeaderStylized>
        <NavStylized>
          <div>
            <img src={LogoHorizontal} alt="Logo do Wilson Santiago" />
          </div>
          <ListStylized>
            {menuItems.map((item) => {
              const sectionId = item.href ? item.href.substring(1) : "";
              const isActive = sectionId === activeSection;

              return (
                <li key={item.href}>
                  {" "}
                  {/* Use o href como key, idealmente um id único */}
                  <LinkStylized href={item.href} $isActive={isActive}>
                    {item.text}
                  </LinkStylized>
                </li>
              );
            })}
          </ListStylized>
        </NavStylized>
      </HeaderStylized>
    </>
  );
};

export default HeaderHome;
