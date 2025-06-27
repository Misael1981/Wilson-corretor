import { IoPersonCircleSharp } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";

const ContainerLoginNotification = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  color: var(--color-golden);
  font-size: 1.5rem;

  button {
    background: var(--degrade-golden);
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    border: 0;
    border-radius: 0.3rem;
    color: var(--color-blue);

    svg {
      font-size: 1.5rem;
    }
  }
`;

const ContainerContact = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.1rem;
  color: var(--color-golden);
  border-bottom: 1px solid #00f0ff;
  padding: 2rem 0 1rem;

  svg {
    padding: 0 0.5rem 0 0;
  }
`;

const ListButtons = () => {
  return (
    <div>
      <ContainerLoginNotification>
        <button>
          <IoPersonCircleSharp />
          Entrar
        </button>
        <FaRegBell />
      </ContainerLoginNotification>
      <ContainerContact>
        <span>Contato</span>
        <MdKeyboardArrowRight />
      </ContainerContact>
    </div>
  );
};

export default ListButtons;
