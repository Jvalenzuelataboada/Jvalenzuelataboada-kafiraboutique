import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { createWhatsAppLink, whatsappMessages,} from "../utils/whatsapp";


const links = [
  { path: "/", label: "Inicio" },
  { path: "/catalogo", label: "Catálogo" },
  { path: "/nosotros", label: "Nosotros" },
  { path: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  const closeMenu = () => setOpen(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-bold transition ${
      isActive ? "text-pink-300" : "text-white/80 hover:text-pink-300"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#302747]/95 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" onClick={closeMenu} className="leading-none">
          <h1 className="text-xl font-black tracking-[0.28em] text-[#a9f8f8]">
            KAFIRA
          </h1>
          <p className="text-center text-xs tracking-[0.45em] text-pink-300">
            BOUTIQUE
          </p>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={createWhatsAppLink(whatsappMessages.navbar)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-600"
          >
            <FaWhatsapp />
            WhatsApp
          </a>

          <Link
            to="/pedido"
            className="rounded-full bg-pink-400 px-4 py-2 text-sm font-bold text-white hover:bg-pink-500"
          >
            🛍️ Mi pedido ({totalItems})
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/pedido"
            onClick={closeMenu}
            className="rounded-full bg-pink-400 px-3 py-2 text-sm font-bold text-white"
          >
            🛍️ ({totalItems})
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl border border-white/20 px-3 py-2 text-xl text-white"
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#302747] px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}

            <a
              href={createWhatsAppLink(whatsappMessages.navbar)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-bold text-white hover:bg-green-600"
            >
              <FaWhatsapp />
              WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}