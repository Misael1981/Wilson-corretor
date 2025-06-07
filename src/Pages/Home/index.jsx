import { useEffect, useState } from "react";
import Categories from "./Components/Categories";
import HeaderHomeMobile from "./Components/HeaderHomeMobile";
import HeroSection from "./Components/HeroSection";
import HeaderHome from "./Components/HeaderHome";
import FinancialBanner from "../../Components/FinancialBanner";
import About from "./Components/About";
import PropertiesFeatured from "../../Components/PropertiesFeatured";
import WorkWithUs from "../../Components/WorkWithUsBanner";
import MiniBlog from "./Components/MiniBlog";
import Footer from "../../Components/Footer";
import Contact from "../../Components/Contact";

const Home = () => {
  const [isMobile, setIsMobile] = useState();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1020);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? <HeaderHomeMobile /> : <HeaderHome />}
      <main>
        <HeroSection />
        <Categories />
        <FinancialBanner />
        <About />
        <PropertiesFeatured />
        <WorkWithUs />
        <MiniBlog />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Home;
