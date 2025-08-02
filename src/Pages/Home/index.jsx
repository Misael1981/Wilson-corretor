import Categories from "./Components/Categories";
import HeroSection from "../../Components/HeroSection";
import FinancialBanner from "../../Components/FinancialBanner";
import About from "./Components/About";
import PropertiesFeatured from "../../Components/PropertiesFeatured";
import WorkWithUs from "../../Components/WorkWithUsBanner";
import MiniBlog from "./Components/MiniBlog";
import Footer from "../../Components/Footer";
import Contact from "@/Components/Contact";
// import Contact from "../../Components/Contact";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <FinancialBanner />
      <About />
      <PropertiesFeatured />
      <WorkWithUs />
      <MiniBlog />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
