import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import GlobalStyles from "./Components/GlobalStyles";
// Importa o componente da pasta RealEstate e o nomeia como CategoryProperties
import CategoryProperties from "./Pages/RealEstate";
import PropertyDetailPage from "./Pages/PropertyDetailPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*
          CORRIGIDO: A rota para "/imoveis" agora usa o nome do componente importado: CategoryProperties
          Este path irá renderizar a página de imóveis sem um filtro de categoria específico.
        */}
        <Route path="/imoveis" element={<CategoryProperties />} />

        {/*
          Esta rota com o parâmetro ":category" também usa o nome do componente importado.
          Ela renderizará a página de imóveis filtrada pela categoria especificada na URL.
        */}
        <Route path="/imoveis/:category" element={<CategoryProperties />} />

        <Route path="/imovel/:id" element={<PropertyDetailPage />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="*" element={<div>404 - Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
