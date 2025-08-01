import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import GlobalStyles from "./Components/GlobalStyles";
import FloatingWhatsApp from "./Components/FloatingWhatsApp";
import CategoryProperties from "./Pages/RealEstate";
import PropertyDetailPage from "./Pages/PropertyDetailPage";
import ArticleDetailPage from "./Pages/Blog/ArticleDetailPage";
import Login from "./Pages/Login";
import DefaultPage from "./Components/DefaultPage";
import Register from "./Pages/Register";
import AdminLayout from "./features/layouts/AdminLayout";
import AdminDashboardPage from "./features/pages/AdminDashboardPage";
import ArticlesAdmin from "./features/pages/ArticlesAdmin";
import PropertiesAdmin from "./features/pages/PropertiesAdmin";
import UsersAdmin from "./features/pages/UsersAdmin";
import SettingsAdmin from "./features/pages/SettingsAdmin";
import CreateArticles from "./features/pages/ArticlesAdmin/pages/CreateArticles";
import EditArticlePage from "./features/pages/ArticlesAdmin/pages/EditArticlePage";
import CreateProperties from "./features/pages/PropertiesAdmin/pages/CreateProperties";
import EditPropertiesPage from "./features/pages/PropertiesAdmin/pages/EditPropertiesPage";

function App() {
  return (
    <>
      <GlobalStyles />
      <FloatingWhatsApp />
      <Routes>
        {/* Home */}
        <Route path="/" element={<DefaultPage />}>
          <Route index element={<Home />} />
          {/* Rotas Imóveis */}
          <Route path="imoveis" element={<CategoryProperties />} />
          {/* Rota para categorias específicas de imóveis (ex: /imoveis/apartamento) */}
          <Route path="imoveis/:category" element={<CategoryProperties />} />
          {/* Rota para detalhes de um imóvel específico (ex: /imovel/123) */}
          <Route path="imovel/:id" element={<PropertyDetailPage />} />
          {/* Rotas do Blog */}
          <Route path="blog" element={<Blog />} />{" "}
          {/* Rota para a página de listagem de todos os artigos */}
          <Route path="blog/:id" element={<ArticleDetailPage />} />{" "}
          {/* Rota para detalhes de um artigo específico (ex: /blog/como-comprar-imovel) */}
          {/* Rota para páginas não encontradas */}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="artigos" element={<ArticlesAdmin />} />
          <Route path="artigos/criar" element={<CreateArticles />} />
          <Route path="artigos/editar/:id" element={<EditArticlePage />} />
          <Route path="imoveis" element={<PropertiesAdmin />} />
          <Route path="imoveis/cadastrar" element={<CreateProperties />} />
          <Route
            path="/admin/imoveis/editar/:id"
            element={<EditPropertiesPage />}
          />
          <Route path="usuarios" element={<UsersAdmin />} />
          <Route path="configuracoes" element={<SettingsAdmin />} />
        </Route>

        <Route path="*" element={<div>404 - Página não encontrada</div>} />
      </Routes>
    </>
  );
}

export default App;
