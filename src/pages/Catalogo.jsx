import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/googleSheetsService";
import { useSearchParams } from "react-router-dom";

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("categoria") || "Todas"
  );
  const [size, setSize] = useState("Todas");
  const [color, setColor] = useState("Todos");
  const [priceOrder, setPriceOrder] = useState("default");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((error) => {
        console.error("Error cargando productos:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ["Todas", ...new Set(products.map((p) => p.categoria))];
  const sizes = ["Todas", ...new Set(products.flatMap((p) => p.tallas || []))];
  const colors = ["Todos", ...new Set(products.flatMap((p) => p.colores || []))];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        product.item?.toString().toLowerCase().includes(searchText) ||
        product.nombre?.toLowerCase().includes(searchText) ||
        product.descripcionCorta?.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "Todas" || product.categoria === category;

      const matchesSize = size === "Todas" || product.tallas?.includes(size);

      const matchesColor = color === "Todos" || product.colores?.includes(color);

      return matchesSearch && matchesCategory && matchesSize && matchesColor;
    });

    if (priceOrder === "menor") {
      result = [...result].sort((a, b) => {
        const priceA = a.precioOferta || a.precio;
        const priceB = b.precioOferta || b.precio;
        return priceA - priceB;
      });
    }

    if (priceOrder === "mayor") {
      result = [...result].sort((a, b) => {
        const priceA = a.precioOferta || a.precio;
        const priceB = b.precioOferta || b.precio;
        return priceB - priceA;
      });
    }

    return result;
  }, [products, search, category, size, color, priceOrder]);

  const clearFilters = () => {
    setSearch("");
    setCategory("Todas");
    setSize("Todas");
    setColor("Todos");
    setPriceOrder("default");
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-pink-400">
          Kafira Boutique
        </p>

        <h1 className="mt-3 text-4xl font-black md:text-5xl">Catálogo</h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          Elige tus prendas favoritas y agrégalas a tu pedido para consultarlas
          por WhatsApp.
        </p>
      </div>

      <section className="mb-10 rounded-3xl bg-white p-5 shadow-lg">
        <div className="grid gap-4 md:grid-cols-5">
          <input
            type="text"
            placeholder="Buscar por item, nombre o descripción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full border border-gray-200 px-5 py-3 outline-none focus:border-pink-400 md:col-span-2"
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-full border border-gray-200 px-5 py-3">
            {categories.map((cat) => <option key={cat}>{cat}</option>)}
          </select>

          <select value={size} onChange={(e) => setSize(e.target.value)} className="rounded-full border border-gray-200 px-5 py-3">
            {sizes.map((item) => <option key={item} value={item}>Talla: {item}</option>)}
          </select>

          <select value={color} onChange={(e) => setColor(e.target.value)} className="rounded-full border border-gray-200 px-5 py-3">
            {colors.map((item) => <option key={item} value={item}>Color: {item}</option>)}
          </select>
        </div>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <select value={priceOrder} onChange={(e) => setPriceOrder(e.target.value)} className="rounded-full border border-gray-200 px-5 py-3">
            <option value="default">Ordenar por precio</option>
            <option value="menor">Menor precio</option>
            <option value="mayor">Mayor precio</option>
          </select>

          <button onClick={clearFilters} className="rounded-full border border-[#302747] px-5 py-3 font-bold text-[#302747] hover:bg-[#302747] hover:text-white">
            Limpiar filtros
          </button>
        </div>
      </section>

      {loading ? (
        <p className="font-bold text-gray-600">Cargando productos...</p>
      ) : (
        <>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-pink-400">
                Catálogo
              </p>

              <h2 className="text-2xl font-black">
                {filteredProducts.length} productos encontrados
              </h2>
            </div>
          </div>

          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.item} product={product} />
            ))}
          </section>
        </>
      )}
    </main>
  );
}