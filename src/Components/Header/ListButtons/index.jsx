import { IoPersonCircleSharp } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import ContatoDrawer from "./ContatoDrawer";

const ListButtonsStylized = styled.div`
  @media screen and (width > 1024px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ContainerLoginNotification = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  color: var(--color-golden);
  font-size: 1.5rem;

  @media screen and (width > 1024px) {
    gap: 0.5rem;
  }

  button {
    background: var(--degrade-golden);
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.5rem;
    font-size: 1rem;
    border: 0;
    border-radius: 0.3rem;
    color: var(--color-blue);

    svg {
      font-size: 1.5rem;
    }
  }
`;

const ContainerContact = styled.div`

  @media screen and (width > 1024px) {
    display: none;
  }
  @media screen and (width > 1124px) {
    display: flex;
    order: -1;
    border: none;
    padding: 0;
  }

  svg {
    padding: 0 0.5rem 0 0;
    font-size: 1.5rem;
  }
`;

const ListButtons = () => {
  return (
    <ListButtonsStylized>
      <ContainerLoginNotification>
        <button>
          <IoPersonCircleSharp />
          Entrar
        </button>
        <FaRegBell />
      </ContainerLoginNotification>
      <ContainerContact>
        <ContatoDrawer />
      </ContainerContact>
    </ListButtonsStylized>
  );
};

export default ListButtons;
