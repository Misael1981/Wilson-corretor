import React from "react";
import logoHorizonatl from "/img/logo-horizontal.svg";
import styled from "styled-components";
import ListPages from "../components/ListPages";
import ListButtons from "../components/ListButtons";
import InputHeader from "../components/InputHeader";

const HeaderDesktopStylized = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const HeaderDesktopImage = styled.div`
  width: 10rem;

  @media screen and (width > 1224px) {
    padding-right: 5rem;
    border-right: 5px solid var(--color-golden);
  }
  img {
    width: 100%;
  }
`;

const DesktopNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
`;

const HeaderDesktop = () => {
  return (
    <HeaderDesktopStylized>
      <HeaderDesktopImage>
        <img src={logoHorizonatl} alt="Logo do corretor Wilson Santiago" />
      </HeaderDesktopImage>
      <DesktopNav>
        <ListPages />
        <InputHeader />
        <ListButtons />
      </DesktopNav>
    </HeaderDesktopStylized>
  );
};

export default HeaderDesktop;
