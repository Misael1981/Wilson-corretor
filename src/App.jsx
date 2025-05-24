import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import RealEstate from "./Pages/RealEstate";
import Blogs from "./Pages/Blogs";
import GlobalStyles from "./Components/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imoveis" element={<RealEstate />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
