import Categories from "./Components/Categories";
import HeaderHomeMobile from "./Components/HeaderHomeMobile";
import HeroSection from "./Components/HeroSection";

const Home = () => {
  return (
    <>
      <HeaderHomeMobile />
      <main>
        <HeroSection />
        <Categories />
      </main>
    </>
  );
};

export default Home;
