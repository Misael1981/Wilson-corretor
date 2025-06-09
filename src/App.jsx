import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import GlobalStyles from "./Components/GlobalStyles";
import CategoryProperties from "./Pages/RealEstate"; // <-- IMPORTAÇÃO ATUALIZADA: Aponta para a pasta RealEstate que agora fará a função de CategoryProperties

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* AGORA /imoveis/:category APONTA PARA CategoryProperties (que é o seu RealEstate) */}
        <Route path="/imoveis/:category" element={<CategoryProperties />} />
        {/* Opcional: Se você quer que /imoveis sozinho também exiba algo (talvez todos os imóveis sem filtro de categoria): */}
        {/* <Route path="/imoveis" element={<CategoryProperties />} /> */}
        <Route path="/blogs" element={<Blogs />} />
        {/* Rota para 404 (Página não encontrada) */}
        <Route path="*" element={<div>404 - Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
