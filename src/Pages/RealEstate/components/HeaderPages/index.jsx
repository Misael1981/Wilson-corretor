import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { IoFilterCircleOutline } from "react-icons/io5";
import logoHorizontal from "/img/logo-horizontal.svg";
import { Link } from "react-router-dom";

const HeaderPagesStylized = styled.header`
  width: 100%;
  height: 6rem;
  background-color: var(--color-blue);
`;

const HeaderPagesContainer = styled.div`
  width: 95vw;
  height: 6rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    color: var(--color-golden);
    font-size: 2rem;
    cursor: pointer;
  }
`;

const LogoContainer = styled.div`
  width: 10rem;
  height: auto;
  img {
    width: 100%;
  }
`;

const LinkFilter = styled.div`
  border: 1px solid var(--color-golden);
  border-radius: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  color: var(--color-golden);
  font-size: 1.2rem;
  font-weight: 700;
`;

const HeaderPages = () => {
  return (
    <HeaderPagesStylized>
      <HeaderPagesContainer>
        <Link to={"/"}>
          <FaArrowLeft />
        </Link>
        <LogoContainer>
          <img src={logoHorizontal} alt="Logo do Wilson Santiago corretor" />
        </LogoContainer>
        <LinkFilter>
          <span>Filtros</span>
          <IoFilterCircleOutline />
        </LinkFilter>
      </HeaderPagesContainer>
    </HeaderPagesStylized>
  );
};

export default HeaderPages;
