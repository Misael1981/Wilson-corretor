import { IoPersonCircleSharp } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import ContatoDrawer from "./ContatoDrawer";

const ListButtonsStylized = styled.div`
  @media screen and (width > 1024px) {
    display: flex;
    align-items: center;
<<<<<<< HEAD
    gap: 0.5rem;
=======
>>>>>>> 060a3a11933365002666540e4d8458f4c18f9275
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
<<<<<<< HEAD
    padding: 0.3rem 0.5rem;
    font-size: 1rem;
=======
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
>>>>>>> 060a3a11933365002666540e4d8458f4c18f9275
    border: 0;
    border-radius: 0.3rem;
    color: var(--color-blue);

    svg {
      font-size: 1.5rem;
    }
  }
`;

const ContainerContact = styled.div`
<<<<<<< HEAD
=======
  /* background-color: transparent;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 1rem;
  color: var(--color-golden);
  border: none;
  border-bottom: 1px solid #00f0ff;
  padding: 1.5rem 1rem 1rem; */
>>>>>>> 060a3a11933365002666540e4d8458f4c18f9275

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
