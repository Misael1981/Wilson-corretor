import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import logoHorizonatl from "/img/logo-horizontal.svg";
import ListPages from "../components/ListPages";
import ListButtons from "../components/ListButtons";
import InputHeader from "../components/InputHeader";

const SidebarContainer = styled.div`
  position: fixed;
  top: ${({ isOpen }) => (isOpen ? "0px" : "100%")};
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--color-blue);
  color: #fff;
  transition: top 0.5s ease-in-out;
  z-index: 200;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 1rem;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 10rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  font-size: 2rem;
  cursor: pointer;
`;

const NavList = styled.nav`
  margin-top: 20%;
  list-style: none;
  padding: 0;
`;

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <img src={logoHorizonatl} alt="Logo do corretor Wilson Santiago" />
        <CloseButton onClick={onClose}>
          <IoClose />
        </CloseButton>
      </SidebarHeader>

      <NavList>
        <ListButtons />
        <ListPages />
      </NavList>
      <InputHeader />
    </SidebarContainer>
  );
};

export default Sidebar;
