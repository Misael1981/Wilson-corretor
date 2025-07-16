import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import GlobalStyles from "./Components/GlobalStyles";
import CategoryProperties from "./Pages/RealEstate";
import PropertyDetailPage from "./Pages/PropertyDetailPage";
import ArticleDetailPage from "./Pages/Blog/ArticleDetailPage";
import Header from "./Components/Header";
import { db } from "./firebase";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        {/* Rotas Imóveis */}
        <Route path="/imoveis" element={<CategoryProperties />} />
        {/* Rota para categorias específicas de imóveis (ex: /imoveis/apartamento) */}
        <Route path="/imoveis/:category" element={<CategoryProperties />} />
        {/* Rota para detalhes de um imóvel específico (ex: /imovel/123) */}
        <Route path="/imovel/:id" element={<PropertyDetailPage />} />
        {/* Rotas do Blog */}
        <Route path="/blog" element={<Blog />} />{" "}
        {/* Rota para a página de listagem de todos os artigos */}
        <Route path="/blog/:id" element={<ArticleDetailPage />} />{" "}
        {/* Rota para detalhes de um artigo específico (ex: /blog/como-comprar-imovel) */}
        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<div>404 - Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
