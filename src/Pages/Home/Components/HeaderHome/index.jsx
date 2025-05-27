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
  color: var(--color-golden);
  font-family: var(--font-title);
  font-size: 1.5rem;
  font-weight: 600;
`;

const HeaderHome = () => {
  return (
    <>
      <HeaderStylized>
        <NavStylized>
          <div>
            <img src={LogoHorizontal} alt="Logo do Wilson Santiago" />
          </div>
          <ListStylized>
            <li>
              <LinkStylized href="#">Home</LinkStylized>
            </li>
            <li>
              <LinkStylized href="#">Imóveis</LinkStylized>
            </li>
            <li>
              <LinkStylized href="#">Busca</LinkStylized>
            </li>
            <li>
              <LinkStylized href="#">Contato</LinkStylized>
            </li>
          </ListStylized>
        </NavStylized>
      </HeaderStylized>
    </>
  );
};

export default HeaderHome;
