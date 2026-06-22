import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import ProductoDetalle from "./pages/ProductoDetalle";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Pedido from "./pages/Pedido";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <div className="min-h-screen bg-[#fff7fb] text-[#302747]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/catalogo/:slug" element={<ProductoDetalle />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}