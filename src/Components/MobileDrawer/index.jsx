import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";

const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
  transition: opacity 0.4s ease;
`;

const DrawerContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 90%;
  background-color: rgba(214, 182, 137, 0.8);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  transform: translateX(${(props) => (props.$isOpen ? "0" : "100%")});
  transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--color-blue);
`;

const DrawerMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: var(--color-dark-gray);
    font-family: var(--font-text);
    font-size: 1.2rem;
    &:hover {
      color: var(--color-golden);
    }
  }
`;

const MobileDrawer = ({ isOpen, onClose }) => (
  <>
    <DrawerOverlay $isOpen={isOpen} onClick={onClose} />
    <DrawerContent $isOpen={isOpen}>
      <CloseButton onClick={onClose}>
        <IoCloseOutline />
      </CloseButton>
      <DrawerMenu>
        <li>
          <a href="#">Link Adicional 1</a>
        </li>
        <li>
          <a href="#">Link Adicional 2</a>
        </li>
        <li>
          <a href="#">Link Adicional 3</a>
        </li>
      </DrawerMenu>
    </DrawerContent>
  </>
);

export default MobileDrawer;
