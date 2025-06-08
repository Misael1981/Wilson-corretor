import { useEffect, useState, useMemo } from "react";
import Categories from "./Components/Categories";
import HeaderHomeMobile from "../../Components/HeaderHomeMobile";
import HeroSection from "./Components/HeroSection";
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
import MobileDrawer from "../../Components/HeaderHomeMobile/MobileDrawer";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // <--- Novo estado para o menu lateral

  // Função para abrir o menu
  const openDrawer = () => setIsDrawerOpen(true);
  // Função para fechar o menu
  const closeDrawer = () => setIsDrawerOpen(false);

  const sectionIds = useMemo(
    () => [
      "hero-section",
      "properties-featured",
      "property-type-input",
      "contact",
    ],
    []
  );

  const [activeSection, setActiveSection] = useState("");
  const mobileMenuItems = [
    { icon: IoHomeOutline, text: "Home", href: "#hero-section" },
    {
      icon: MdOutlineRealEstateAgent,
      text: "Imóveis",
      href: "#properties-featured",
    },
    { icon: IoSearchOutline, text: "Busca", href: "#property-type-input" }, // Ajuste o href conforme necessário
    { icon: GrContact, text: "Contato", href: "#contact" },
    { icon: IoIosMore, text: "Mais", onClick: openDrawer }, // <--- Usa onClick para abrir o menu lateral
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
      root: null, // Observar em relação à viewport
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

    // Observar cada seção
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Limpar o observer ao desmontar o componente
    return () => {
      observer.disconnect();
    };
  }, [sectionIds]); // Re-executa se a lista de IDs mudar (improvável, mas boa prática)

  return (
    <>
      {isMobile ? (
        <HeaderHomeMobile
          menuItems={mobileMenuItems}
          activeSection={activeSection}
        />
      ) : (
        <HeaderHome />
      )}
      {/* Renderiza o MobileDrawer condicionalmente e passa as props */}
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
