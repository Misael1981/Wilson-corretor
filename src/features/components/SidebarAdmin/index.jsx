import styled from "styled-components";
import logo from "/img/logo-vertical.svg";
import { NavLink } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const SidebarAdminStyled = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: var(--degrade-blue, linear-gradient(to bottom, #0f1e2e, #0a141f));
  padding: 1rem 0rem;
  box-sizing: border-box;
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;

  @media (min-width: 1024px) {
    transform: translateX(0);
    position: sticky;
    top: 0;
    justify-content: space-around;
  }

  nav {
    width: 100%;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  align-self: flex-end;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SidebarImageContainer = styled.div`
  width: 14rem;
  box-sizing: border-box;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
  }
`;

const ListSidebar = styled.ul`
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    width: 100%;
  }
`;

const LinkSidebarStyled = styled(NavLink)`
  text-decoration: none;
  color: var(--color-golden, #f39c12);
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);

    svg {
      transform: translateX(5px);
    }
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-weight: bold;
  }
`;

const SidebarAdmin = ({ isOpen, onClose }) => {
  const itensLinks = [
    {
      page: "Dashboard",
      to: "/admin",
    },
    {
      page: "Imóveis",
      to: "/admin/imoveis",
    },
    {
      page: "Artigos",
      to: "/admin/artigos",
    },
    {
      page: "Usuários",
      to: "/admin/usuarios",
    },
    {
      page: "Configurações",
      to: "/admin/configuracoes",
    },
  ];
  return (
    <SidebarAdminStyled isOpen={isOpen}>
      <CloseButton onClick={onClose}>
        <IoClose />
      </CloseButton>

      <SidebarImageContainer>
        <img src={logo} alt="Logo de Wilson Santiago Imóveis" />
      </SidebarImageContainer>
      <nav>
        <ListSidebar>
          {itensLinks.map((item) => (
            <li>
              <LinkSidebarStyled to={item.to}>
                {item.page}
                <MdKeyboardArrowRight />
              </LinkSidebarStyled>
            </li>
          ))}
        </ListSidebar>
      </nav>
    </SidebarAdminStyled>
  );
};

export default SidebarAdmin;
