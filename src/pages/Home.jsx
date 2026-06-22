import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { getProducts } from "../services/googleSheetsService";
import FeaturedProductCard from "../components/FeaturedProductCard";
import { createWhatsAppLink, whatsappMessages } from "../utils/whatsapp";
import { company } from "../data/company";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  const featuredProducts = useMemo(() => {
    const unique = new Map();

    products
      .filter((product) => product.destacado?.toUpperCase() === "SI")
      .forEach((product) => {
        if (!unique.has(product.item)) {
          unique.set(product.item, product);
        }
      });

    return Array.from(unique.values()).slice(0, 6);
  }, [products]);

  const featuredCategories = useMemo(() => {
    const unique = new Map();

    products.forEach((product) => {
      if (product.categoria && !unique.has(product.categoria)) {
        unique.set(product.categoria, product);
      }
    });

    return Array.from(unique.values()).slice(0, 6);
  }, [products]);

  return (
    <main>
      <section className="bg-[#2f2645]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-2 md:items-center md:px-6 md:py-16">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
              Moda femenina online
            </p>

            <h1 className="mb-5 text-3xl font-black leading-tight text-white md:text-6xl">
              Descubre tu
              <span className="block text-pink-300">mejor versión</span>
            </h1>

            <p className="mb-7 max-w-xl text-base text-gray-300 md:text-lg">
              Prendas elegantes, modernas y cómodas para cada ocasión. Elige tus
              productos favoritos y envía tu pedido directamente por WhatsApp.
            </p>

            <div className="mb-8 grid gap-3 sm:grid-cols-2">
              <Link
                to="/catalogo"
                className="rounded-full bg-pink-400 px-7 py-4 text-center font-bold text-white transition hover:bg-pink-500"
              >
                Ver catálogo
              </Link>

              <a
                href={createWhatsAppLink(whatsappMessages.home)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-cyan-300 px-7 py-4 text-center font-bold text-cyan-300 transition hover:bg-cyan-300 hover:text-[#2f2645]"
              >
                Comprar por WhatsApp
              </a>
            </div>

            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              <a
                href={company.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-full bg-white/10 px-5 py-4 font-bold text-white transition hover:bg-[#ff0050]"
              >
                <FaTiktok className="text-2xl" />
                TikTok
              </a>

              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-full bg-white/10 px-5 py-4 font-bold text-white transition hover:bg-pink-500"
              >
                <FaInstagram className="text-2xl" />
                Instagram
              </a>

              <a
                href={company.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-full bg-white/10 px-5 py-4 font-bold text-white transition hover:bg-blue-600"
              >
                <FaFacebook className="text-2xl" />
                Facebook
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <div>✓ Compra sencilla</div>
              <div>✓ Atención personalizada</div>
              <div>✓ Venta 100% online</div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="rounded-full bg-white/5 p-6 md:p-8">
              <img
                src="/images/logo/kafira-logo.jpeg"
                alt="Kafira Boutique"
                className="w-48 transition hover:scale-105 md:w-72"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-14">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-pink-400">
            Explora por estilo
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Categorías destacadas
          </h2>
        </div>

        {featuredCategories.length > 0 ? (
          <div className="flex gap-5 overflow-x-auto pb-4 lg:overflow-visible">
            {featuredCategories.map((product) => (
              <Link
                key={product.categoria}
                to={`/catalogo?categoria=${encodeURIComponent(
                  product.categoria
                )}`}
                className="min-w-[65%] flex-shrink-0 overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl sm:min-w-[42%] md:min-w-[30%] lg:min-w-0 lg:flex-1"
              >
                <div className="h-28 bg-pink-100 md:h-40 lg:h-32">
                  <img
                    src={product.imagen}
                    alt={product.categoria}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-4 text-center">
                  <h3 className="text-lg font-black hover:text-pink-400">
                    {product.categoria}
                  </h3>
                  <p className="mt-1 text-xs text-gray-600">
                    Ver productos disponibles
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
            <p className="font-bold text-gray-600">
              Aún no hay categorías disponibles.
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-14">
        <h2 className="mb-10 text-center text-3xl font-black md:text-4xl">
          ¿Por qué comprar en Kafira Boutique?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-7 shadow-lg">
            <div className="mb-4 text-5xl">👗</div>
            <h3 className="mb-3 text-2xl font-bold">Moda actual</h3>
            <p className="text-gray-600">
              Prendas modernas y elegantes seleccionadas cuidadosamente.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-lg">
            <div className="mb-4 text-5xl">📱</div>
            <h3 className="mb-3 text-2xl font-bold">Compra sencilla</h3>
            <p className="text-gray-600">
              Agrega productos y envía tu pedido directamente por WhatsApp.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-lg">
            <div className="mb-4 text-5xl">🚚</div>
            <h3 className="mb-3 text-2xl font-bold">Atención personalizada</h3>
            <p className="text-gray-600">
              Consulta tallas, colores y disponibilidad antes de comprar.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-pink-400">
              Selección especial
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Productos destacados
            </h2>
          </div>

          <Link
            to="/catalogo"
            className="rounded-full border border-[#302747] px-6 py-3 text-center font-bold text-[#302747] hover:bg-[#302747] hover:text-white"
          >
            Ver todo
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-6 lg:overflow-visible">
            {featuredProducts.map((product) => (
              <div
                key={product.item}
                className="min-w-[65%] flex-shrink-0 sm:min-w-[42%] md:min-w-[30%] lg:min-w-0"
              >
                <FeaturedProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
            <p className="font-bold text-gray-600">
              Aún no hay productos destacados.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}