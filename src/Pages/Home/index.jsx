import { useEffect, useState, useMemo } from "react";
import Categories from "./Components/Categories";
import HeaderHomeMobile from "../../Components/HeaderHomeMobile";
import HeroSection from "../../Components/HeroSection";
import HeaderHome from "../../Components/HeaderHome";
import FinancialBanner from "../../Components/FinancialBanner";
import About from "./Components/About";
import PropertiesFeatured from "../../Components/PropertiesFeatured";
import WorkWithUs from "../../Components/WorkWithUsBanner";
import MiniBlog from "./Components/MiniBlog";
import Footer from "../../Components/Footer";
import Contact from "../../Components/Contact";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { GrContact } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";
import MobileDrawer from "../../Components/MobileDrawer";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Função para abrir o menu
  const openDrawer = () => setIsDrawerOpen(true);
  // Função para fechar o menu
  const closeDrawer = () => setIsDrawerOpen(false);

  const sectionIds = useMemo(
    () => [
      "categories",
      "properties-featured",
      "property-type-input",
      "contact",
    ],
    []
  );

  const mobileMenuItems = [
    { icon: IoHomeOutline, text: "Categorias", href: "#categories" },
    {
      icon: MdOutlineRealEstateAgent,
      text: "Imóveis",
      href: "#properties-featured",
    },
    { icon: IoSearchOutline, text: "Busca", href: "#property-type-input" },
    { icon: GrContact, text: "Contato", href: "#contact" },
    { icon: IoIosMore, text: "Mais", onClick: openDrawer },
  ];

  const desktopMenuItems = [
    { text: "Categorias", href: "#categories" },
    { text: "Imóveis", href: "#properties-featured" },
    { text: "Busca", href: "#property-type-input" },
    { text: "Contato", href: "#contact" },
  ];

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

  useEffect(() => {
    // Opções do Intersection Observer
    // rootMargin: Adiciona uma margem ao redor da viewport para que a interseção seja detectada antes
    // threshold: Porcentagem do elemento que precisa estar visível para ser considerado "intersecting"
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50% 0px", // Detecta quando o topo da seção chega à metade da tela
      threshold: 0, // Apenas para inicializar, o rootMargin é mais importante aqui
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Se o topo da seção cruzou a metade da tela, defina-a como ativa
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return (
    <>
      {isMobile ? (
        <HeaderHomeMobile
          menuItems={mobileMenuItems}
          activeSection={activeSection}
        />
      ) : (
        <HeaderHome // PASSE AS PROPS PARA O HEADER DESKTOP
          menuItems={desktopMenuItems}
          activeSection={activeSection}
        />
      )}
      <MobileDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
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
