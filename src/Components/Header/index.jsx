import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const HeaderStylized = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 4rem;
  background-color: var(--color-blue, #0f1e2e);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem;
  z-index: 100;
  color: #ccc;

  @media screen and (min-width: 1021px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 2rem;
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <HeaderStylized>
        <MenuButton onClick={handleMenuToggle}>
          <IoMenu />
        </MenuButton>
      </HeaderStylized>
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
