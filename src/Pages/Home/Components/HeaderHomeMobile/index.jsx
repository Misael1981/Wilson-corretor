import { MdOutlineRealEstateAgent } from "react-icons/md";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { GrContact } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";
import styled from "styled-components";

const HeaderMobileStylStylized = styled.header`
  width: 100%;
  background-color: var(--color-blue);
  position: fixed;
  bottom: 0;
  padding: 0.5rem;
  box-sizing: border-box;
`;

const ListStylized = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkStylized = styled.a`
  color: #ccc;
  font-size: 2rem;
  text-decoration: none;
  font-family: var(--font-title);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  span {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const HeaderHomeMobile = () => {
  return (
    <HeaderMobileStylStylized>
      <nav>
        <ListStylized>
          <li>
            <LinkStylized href="#">
              <IoHomeOutline />
              <span>Home</span>
            </LinkStylized>
          </li>
          <li>
            <LinkStylized href="#">
              <MdOutlineRealEstateAgent />
              <span>Imóveis</span>
            </LinkStylized>
          </li>
          <li>
            <LinkStylized href="#">
              <IoSearchOutline />
              <span>Busca</span>
            </LinkStylized>
          </li>
          <li>
            <LinkStylized href="#">
              <GrContact />
              <span>Contato</span>
            </LinkStylized>
          </li>
          <li>
            <LinkStylized href="#">
              <IoIosMore />
              <span>Mais</span>
            </LinkStylized>
          </li>
        </ListStylized>
      </nav>
    </HeaderMobileStylStylized>
  );
};

export default HeaderHomeMobile;
