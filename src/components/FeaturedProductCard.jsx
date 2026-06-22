import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createProductSlug } from "../services/googleSheetsService";

const fallbackImage = "/images/productos/producto-1.jpg";

export default function FeaturedProductCard({ product }) {
  const { addToCart } = useCart();

  const slug = createProductSlug(product);
  const finalPrice = product.precioOferta || product.precio;

  const stock = Number(product.stock) || 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  return (
    <div className="h-full overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/catalogo/${slug}`}>
        <div className="relative h-40 overflow-hidden bg-pink-100">
          <img
            src={product.imagen || fallbackImage}
            alt={product.nombre}
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
            }}
            className="h-full w-full object-cover"
          />

          {product.precioOferta ? (
            <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-3 py-1 text-xs font-black text-white">
              Oferta
            </span>
          ) : null}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs font-bold text-pink-400">Item: {product.item}</p>

        <h3 className="mt-2 line-clamp-2 text-lg font-black">
          {product.nombre}
        </h3>

        <p className="mt-3 text-xl font-black text-[#302747]">
          S/ {Number(finalPrice).toFixed(2)}
        </p>

        <p
          className={`mt-2 text-sm font-bold ${
            isOutOfStock
              ? "text-red-500"
              : isLowStock
              ? "text-orange-500"
              : "text-green-600"
          }`}
        >
          {isOutOfStock
            ? "Agotado"
            : isLowStock
            ? "Pocas unidades"
            : "Disponible"}
        </p>

        <div className="mt-4 grid gap-2">
          <Link
            to={`/catalogo/${slug}`}
            className="rounded-full border border-[#302747] px-4 py-2 text-center text-sm font-bold text-[#302747] hover:bg-[#302747] hover:text-white"
          >
            Ver detalle
          </Link>

          <button
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
            className="rounded-full bg-[#302747] px-4 py-2 text-sm font-bold text-white hover:bg-[#463865] disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isOutOfStock ? "Agotado" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}