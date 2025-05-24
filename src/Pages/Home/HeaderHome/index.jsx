import styled from "styled-components";
import LogoHorizontal from "/img/logo-horizontal.svg";

const HeaderStylized = styled.header`
  background-color: #0f1b29;
  width: 100%;
`;

const HeaderHome = () => {
  return (
    <>
      <HeaderStylized>
        <nav>
          <div>
            <img src={LogoHorizontal} alt="Logo do Wilson Santiago" />
          </div>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Imóveis</a>
            </li>
            <li>
              <a href="#">Busca</a>
            </li>
            <li>
              <a href="#">Contato</a>
            </li>
          </ul>
        </nav>
      </HeaderStylized>
    </>
  );
};

export default HeaderHome;
