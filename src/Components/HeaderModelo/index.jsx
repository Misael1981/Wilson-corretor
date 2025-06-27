import styled from "styled-components";
import LogoHorizontal from "/img/logo-horizontal.svg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { IoPersonCircleSharp } from "react-icons/io5";

const HeaderStylized = styled.header`
  width: 100%;
  height: 6rem;
  position: sticky;
  top: 0;
  background-color: var(--color-blue);
  z-index: 1001;

  @media screen and (width < 1024px) {
    display: none;
  }
`;

const ContainerHeader = styled.div`
  width: 95vw;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContainerImageHeader = styled.div`
  width: 10rem;
  border-right: 5px solid var(--color-golden);
  padding-right: 5rem;

  img {
    width: 100%;
  }
`;

const ListLinksHeader = styled.ul`
  display: flex;
  gap: 2rem;
  color: var(--color-golden);
  font-size: 1rem;
  font-family: var(--font-title);
  font-weight: 700;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ContainerInput = styled.div`
  border: 2px solid var(--color-golden);
  border-radius: 0.3rem;
  background-color: #08284d;
  padding: 0.3rem;
  width: 20rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    background-color: transparent;
    color: #ccc;
    border: none;
    outline: 0;
  }
  button {
    font-size: 0.75rem;
    padding: 8px 16px;
    background: var(--color-golden);
    color: var(--color-blue);
    font-weight: 700;
    border: none;
    cursor: pointer;
    position: relative;
    clip-path: polygon(10% 0, 100% 0, 100% 40%, 90% 100%, 0 100%, 0 60%);
    transition: background 0.3s ease;

    &:hover {
      background: #e0a655;
    }
  }
`;

const ListContact = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-golden);
  font-size: 1rem;
  font-family: var(--font-title);
  font-weight: 700;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ItemButton = styled.li`
  background: var(--degrade-blue);
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const HeaderModelo = () => {
  const linksHeader = ["Home", "Imóveis", "Blog"];
  return (
    <HeaderStylized>
      <ContainerHeader>
        <ContainerImageHeader>
          <img src={LogoHorizontal} alt="Logo do Corretor Wilson Santiago" />
        </ContainerImageHeader>
        <ListLinksHeader>
          {linksHeader.map((link) => (
            <li>
              {link}
              <MdKeyboardArrowRight />
            </li>
          ))}
        </ListLinksHeader>
        <ContainerInput>
          <input type="text" placeholder="O que você procura?" />
          <button>Pesquisar</button>
        </ContainerInput>
        <ListContact>
          <li>
            <FaRegBell />
          </li>
          <ItemButton>
            Contato
            <GrContact />
          </ItemButton>
          <ItemButton>
            <IoPersonCircleSharp />
            Entrar
          </ItemButton>
        </ListContact>
      </ContainerHeader>
    </HeaderStylized>
  );
};

export default HeaderModelo;
