import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createProductSlug } from "../services/googleSheetsService";

const fallbackImage = "/images/productos/producto-1.jpg";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const finalPrice = product.precioOferta || product.precio;
  const slug = createProductSlug(product);

  const stock = Number(product.stock) || 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/catalogo/${slug}`}>
        <div className="relative h-64 bg-pink-100">
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

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-400">
          Item: {product.item}
        </p>

        <Link to={`/catalogo/${slug}`}>
          <h3 className="mt-2 line-clamp-2 text-xl font-black hover:text-pink-400">
            {product.nombre}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {product.descripcionCorta}
        </p>

        

        <div className="mt-3">
          {product.precioOferta ? (
            <>
              <p className="text-sm font-bold text-gray-400 line-through">
                S/ {Number(product.precio).toFixed(2)}
              </p>
              <p className="text-2xl font-black text-pink-500">
                S/ {Number(finalPrice).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-2xl font-black text-[#302747]">
              S/ {Number(finalPrice).toFixed(2)}
            </p>
          )}
        </div>



        <p
          className={`mt-3 text-sm font-bold ${
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

        <div className="mt-5 grid gap-3">
          <Link
            to={`/catalogo/${slug}`}
            className="rounded-full border border-[#302747] px-5 py-3 text-center font-bold text-[#302747] hover:bg-[#302747] hover:text-white"
          >
            Ver detalle
          </Link>

          <button
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
            className="rounded-full bg-[#302747] px-5 py-3 font-bold text-white hover:bg-[#463865] disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isOutOfStock ? "Agotado" : "Agregar al pedido"}
          </button>
        </div>
      </div>
    </article>
  );
}