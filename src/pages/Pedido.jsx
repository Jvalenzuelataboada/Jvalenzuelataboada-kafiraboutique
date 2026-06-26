import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createWhatsAppLink } from "../utils/whatsapp";

export default function Pedido() {
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    total,
  } = useCart();

  const getFinalPrice = (item) => {
    if (item.cantidad >= 3 && item.precioMayor) {
      return item.precioMayor;
    }

    return item.precioOferta || item.precio;
  };

  const message = cart
    .map((item, index) => {
      const price = getFinalPrice(item);
      const isWholesale = item.cantidad >= 3 && item.precioMayor;

      return `${index + 1}.
Item: ${item.item}
${item.nombre}

Cantidad: ${item.cantidad}
Precio aplicado: S/ ${Number(price).toFixed(2)}
${isWholesale ? "Precio por mayor aplicado" : "Precio unidad aplicado"}
Subtotal: S/ ${(price * item.cantidad).toFixed(2)}`;
    })
    .join("\n\n");

  const whatsappText = `Hola, quiero consultar estos productos de Kafira Boutique:

${message}

Total aproximado: S/ ${total.toFixed(2)}`;

  const whatsappUrl = createWhatsAppLink(whatsappText);

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-20 text-center">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 shadow-lg">
          <div className="text-6xl">🛍️</div>

          <h1 className="mt-5 text-4xl font-black">Mi pedido está vacío</h1>

          <p className="mt-4 text-gray-600">
            Agrega productos desde el catálogo y envía tu consulta por WhatsApp.
          </p>

          <Link
            to="/catalogo"
            className="mt-8 inline-block rounded-full bg-[#302747] px-7 py-3 font-bold text-white hover:bg-[#463865]"
          >
            Ver catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-pink-400">
          Kafira Boutique
        </p>

        <h1 className="mt-3 text-4xl font-black md:text-5xl">Mi pedido</h1>

        <p className="mt-4 text-gray-600">
          Revisa los productos seleccionados antes de enviarlos por WhatsApp.
        </p>
      </div>

      <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          {cart.map((item) => {
            const price = getFinalPrice(item);
            const isWholesale = item.cantidad >= 3 && item.precioMayor;

            return (
              <article
                key={item.item}
                className="flex flex-col gap-5 rounded-3xl bg-white p-5 shadow-lg md:flex-row md:items-center"
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="h-36 w-full rounded-2xl object-cover md:w-36"
                />

                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-400">
                    Item: {item.item}
                  </p>

                  <h2 className="mt-2 text-2xl font-black">{item.nombre}</h2>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.item)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 font-black text-pink-500 hover:bg-pink-200"
                    >
                      -
                    </button>

                    <span className="font-black">{item.cantidad}</span>

                    <button
                      onClick={() => addToCart(item)}
                      disabled={item.cantidad >= Number(item.stock)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 font-black text-pink-500 hover:bg-pink-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-4 grid gap-1 text-sm text-gray-600">
                    <p>
                      Precio aplicado:{" "}
                      <strong>S/ {Number(price).toFixed(2)}</strong>
                    </p>

                    {isWholesale ? (
                      <p className="font-bold text-green-600">
                        Precio por mayor aplicado
                      </p>
                    ) : (
                      <p className="font-bold text-pink-500">
                        Precio unidad aplicado
                      </p>
                    )}
                  </div>

                  <p className="mt-3 text-xl font-black text-[#302747]">
                    Subtotal: S/ {(price * item.cantidad).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.item)}
                  className="rounded-full bg-red-100 px-5 py-3 font-bold text-red-600 hover:bg-red-200"
                >
                  Quitar
                </button>
              </article>
            );
          })}
        </div>

        <aside className="h-fit rounded-3xl bg-white p-6 shadow-lg lg:sticky lg:top-28">
          <h2 className="text-2xl font-black">Resumen</h2>

          <div className="mt-5 border-t border-gray-100 pt-5">
            <p className="text-sm text-gray-600">Total aproximado</p>
            <p className="mt-2 text-4xl font-black text-[#302747]">
              S/ {total.toFixed(2)}
            </p>
          </div>

          <div className="mt-6 rounded-3xl bg-purple-50 p-4 text-center">
            <h3 className="text-xl font-black text-purple-700">
              Paga con Yape
            </h3>

            <img
              src="/images/pagos/yape-qr.jpeg"
              alt="QR Yape Kafira Boutique"
              className="mx-auto mt-4 w-64 rounded-2xl shadow-lg"
            />

            <p className="mt-3 text-sm text-gray-600">
              Escanea el QR y envía tu comprobante por WhatsApp.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-500 px-6 py-4 text-center font-bold text-white hover:bg-green-600"
            >
              Enviar por WhatsApp
            </a>

            <button
              onClick={clearCart}
              className="rounded-full border border-[#302747] px-6 py-3 font-bold text-[#302747] hover:bg-[#302747] hover:text-white"
            >
              Vaciar pedido
            </button>

            <Link
              to="/catalogo"
              className="rounded-full bg-pink-100 px-6 py-3 text-center font-bold text-pink-500 hover:bg-pink-200"
            >
              Seguir comprando
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}