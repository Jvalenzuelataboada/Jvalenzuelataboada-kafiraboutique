import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createProductSlug,
  getProducts,
} from "../services/googleSheetsService";
import { useCart } from "../context/CartContext";
import { createWhatsAppLink } from "../utils/whatsapp";

const fallbackImage = "/images/productos/producto-1.jpg";

export default function ProductoDetalle() {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error cargando producto:", error))
      .finally(() => setLoading(false));
  }, []);

  const product = products.find((item) => createProductSlug(item) === slug);

  useEffect(() => {
    if (product?.imagen) {
      setSelectedImage(product.imagen);
    }
  }, [product]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
          <p className="font-bold text-gray-600">Cargando producto...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-16 text-center">
        <h1 className="text-4xl font-black">Producto no encontrado</h1>
        <Link
          to="/catalogo"
          className="mt-8 inline-block rounded-full bg-[#302747] px-7 py-3 font-bold text-white"
        >
          Volver al catálogo
        </Link>
      </main>
    );
  }

  const images = [product.imagen, product.imagen2, product.imagen3].filter(Boolean);
  const finalPrice = product.precioOferta || product.precio;

  const stock = Number(product.stock) || 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  const whatsappMessage = `Hola, quiero consultar este producto de Kafira Boutique:

Item: ${product.item}
Producto: ${product.nombre}`;

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <Link to="/catalogo" className="font-bold text-pink-400">
        ← Volver al catálogo
      </Link>

      <section className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <img
            src={selectedImage || product.imagen || fallbackImage}
            alt={product.nombre}
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
            }}
            className="h-[420px] w-full rounded-3xl bg-pink-100 object-cover shadow-lg md:h-[520px]"
          />

          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  onClick={() => setSelectedImage(image)}
                  className="overflow-hidden rounded-2xl border-2 border-transparent hover:border-pink-400"
                >
                  <img
                    src={image}
                    alt={product.nombre}
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                    className="h-24 w-full object-cover md:h-28"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-pink-400">
            {product.categoria}
          </p>

          <p className="mt-4 inline-block rounded-full bg-pink-50 px-4 py-2 text-sm font-black text-pink-500">
            Item: {product.item}
          </p>

          <h1 className="mt-5 text-4xl font-black md:text-5xl">
            {product.nombre}
          </h1>

          <div className="mt-5">
            {product.precioOferta ? (
              <>
                <span className="mb-3 inline-block rounded-full bg-pink-500 px-3 py-1 text-xs font-black text-white">
                  Oferta
                </span>

                <p className="text-lg font-bold text-gray-400 line-through">
                  S/ {Number(product.precio).toFixed(2)}
                </p>

                <p className="text-4xl font-black text-pink-500">
                  S/ {Number(finalPrice).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-4xl font-black text-[#302747]">
                S/ {Number(finalPrice).toFixed(2)}
              </p>
            )}
          </div>

          {product.precioMayor ? (
            <div className="mt-5 rounded-3xl bg-green-50 p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-green-600">
                Precio por mayor a partir de 3 unidades
              </p>

              <p className="mt-2 text-4xl font-black text-green-600">
                S/ {Number(product.precioMayor).toFixed(2)}
              </p>
            </div>
          ) : null}

          <p className="mt-6 text-lg text-gray-600">
            {product.descripcionLarga}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-black">Tallas disponibles</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.tallas?.map((talla) => (
                  <span
                    key={talla}
                    className="rounded-full bg-[#fff7fb] px-4 py-2 text-sm font-bold"
                  >
                    {talla}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black">Colores disponibles</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colores?.map((color) => (
                  <span
                    key={color}
                    className="rounded-full bg-[#fff7fb] px-4 py-2 text-sm font-bold"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </div>


          <p
            className={`mt-8 text-sm font-bold ${
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




          <div className="mt-10 grid gap-3">
            <button
              onClick={() => addToCart(product)}
              disabled={isOutOfStock}
              className="rounded-full bg-[#302747] px-7 py-4 text-lg font-bold text-white hover:bg-[#463865] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isOutOfStock ? "Agotado" : "Agregar al pedido"}
            </button>
            <div className="mt-5 rounded-2xl border border-purple-100 bg-purple-50 p-4">
              <h3 className="text-center text-xl font-black text-purple-700">
                💜 Paga con Yape
              </h3>

              <img
                src="/images/pagos/yape-qr.jpeg"
                alt="QR Yape"
                className="mx-auto mt-3 w-32 rounded-xl shadow-md"
              />

              <p className="mt-4 text-center text-sm text-gray-600">
                Escanea el QR y envía el comprobante por WhatsApp para confirmar tu pedido.
              </p>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>✔ Pago seguro mediante Yape.</p>
              <p>✔ Envía tu comprobante por WhatsApp.</p>
              <p>✔ Tu pedido será confirmado rápidamente.</p>
            </div>



            <a
              href={createWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-500 px-7 py-4 text-center text-lg font-bold text-white hover:bg-green-600"
            >
              Consultar este producto por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}