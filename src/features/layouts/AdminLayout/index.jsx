import styled from "styled-components";
import { IoMenu } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SidebarAdmin from "@/features/components/SidebarAdmin";

const AdminLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f2f5;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 2rem;
  padding: 1rem;
  align-self: flex-start;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MainContentArea = styled.main`
  flex-grow: 1;
  padding: 1rem;
  box-sizing: border-box;
  @media (min-width: 1024px) {
  }
`;

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <AdminLayoutContainer>
      <MobileMenuButton onClick={toggleSidebar}>
        <IoMenu />
      </MobileMenuButton>
      <SidebarAdmin isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <MainContentArea>
        <Outlet />
      </MainContentArea>
    </AdminLayoutContainer>
  );
};

export default AdminLayout;
