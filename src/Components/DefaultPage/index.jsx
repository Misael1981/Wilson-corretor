import Header from "../../Components/Header";
import { Outlet } from "react-router-dom";

const DefaultPage = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default DefaultPage;
