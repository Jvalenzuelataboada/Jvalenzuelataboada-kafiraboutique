import { Link } from "react-router-dom";
import { company } from "../data/company";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { createWhatsAppLink, whatsappMessages } from "../utils/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-[#302747] px-5 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">

        <div>
          <h2 className="text-2xl font-black tracking-[0.28em] text-[#a9f8f8]">
            KAFIRA
          </h2>

          <p className="mt-1 text-xs tracking-[0.45em] text-pink-300">
            BOUTIQUE
          </p>

          <p className="mt-6 text-sm text-white/70">
            Moda femenina elegante, moderna y cómoda para cada ocasión.
          </p>

          <a
            href={createWhatsAppLink(whatsappMessages.floating)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 font-bold text-white hover:bg-green-600"
          >
            <FaWhatsapp />

            WhatsApp
          </a>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-black text-pink-300">
            Navegación
          </h3>

          <div className="grid gap-3 text-sm text-white/70">

            <Link to="/" className="hover:text-white">
              Inicio
            </Link>

            <Link to="/catalogo" className="hover:text-white">
              Catálogo
            </Link>

            <Link to="/nosotros" className="hover:text-white">
              Nosotros
            </Link>

            <Link to="/contacto" className="hover:text-white">
              Contacto
            </Link>

          </div>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-black text-pink-300">
            Información
          </h3>

          <div className="grid gap-3 text-sm text-white/70">

            <p>✓ Venta 100% online</p>

            <p>✓ Atención personalizada</p>

            <p>✓ Compra segura por WhatsApp</p>

            <p>✓ Lima, Perú</p>

          </div>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-black text-pink-300">
            Redes sociales
          </h3>

          <div className="flex gap-4">

            <a
              href={company.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-pink-300"
            >
              <FaInstagram />
            </a>

            <a
              href={company.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-pink-300"
            >
              <FaFacebook />
            </a>

            <a
              href={company.tiktok || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-pink-300"
            >
              <FaTiktok />
            </a>

          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-black text-pink-300">
              Paga con Yape
            </h3>

            <img
              src="/images/pagos/yape-qr.jpeg"
              alt="QR Yape Kafira Boutique"
              className="w-24 rounded-xl bg-white p-1 shadow-lg"
            />

            <p className="mt-2 text-xs text-white/70">
              Escanea el QR y envía tu comprobante por WhatsApp.
            </p>
          </div>

          <p className="mt-6 text-sm text-white/70">
            {company.whatsappDisplay}
          </p>
        </div>

      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-white/50">

        © {new Date().getFullYear()} Kafira Boutique. Todos los derechos reservados.

      </div>
    </footer>
  );
}