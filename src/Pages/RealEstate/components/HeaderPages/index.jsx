import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import logoHorizontal from "/img/logo-horizontal.svg";
import { Link } from "react-router-dom";
import Login from "../../../../Components/Login";

const HeaderPagesStylized = styled.header`
  position: sticky;
  top: 0;
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
        <Login />
      </HeaderPagesContainer>
    </HeaderPagesStylized>
  );
};

export default HeaderPages;
