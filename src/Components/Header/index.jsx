import { IoMenu } from "react-icons/io5";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import HeaderDesktop from "./HeaderDesktop";
import { useState } from "react";

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

  @media screen and (width > 1024px) {
    height: 5rem;
  }
`;

const MobileToggle = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 2rem;

  @media screen and (width > 1024px) {
    display: none;
  }
`;

const HeaderDesktopContainer = styled.div`
  display: none;

  @media screen and (width > 1024px) {
    display: block;
    width: 100%;
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <HeaderStylized>
        <MobileToggle onClick={handleMenuToggle}>
          <IoMenu />
        </MobileToggle>
        <HeaderDesktopContainer>
          <HeaderDesktop />
        </HeaderDesktopContainer>
      </HeaderStylized>
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;