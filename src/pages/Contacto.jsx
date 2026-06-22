import { useState } from "react";
import { createWhatsAppLink } from "../utils/whatsapp";
import { company } from "../data/company";



export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const whatsappMessage = `Hola Kafira Boutique, quiero hacer una consulta:

Nombre: ${form.nombre}
Teléfono: ${form.telefono}
Mensaje: ${form.mensaje}`;

  const whatsappUrl = createWhatsAppLink(whatsappMessage);

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-pink-400">
          Contacto
        </p>

        <h1 className="mt-3 text-4xl font-black md:text-5xl">
          Escríbenos por WhatsApp
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          Completa tus datos y envíanos tu consulta directamente por WhatsApp.
        </p>
      </div>

      <section className="grid gap-8 md:grid-cols-2">
        <form className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="grid gap-5">
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              className="rounded-full border border-gray-200 px-5 py-3 outline-none focus:border-pink-400"
            />

            <input
              type="text"
              name="telefono"
              placeholder="Tu teléfono"
              value={form.telefono}
              onChange={handleChange}
              className="rounded-full border border-gray-200 px-5 py-3 outline-none focus:border-pink-400"
            />

            <textarea
              name="mensaje"
              placeholder="Escribe tu consulta"
              value={form.mensaje}
              onChange={handleChange}
              rows="5"
              className="rounded-3xl border border-gray-200 px-5 py-3 outline-none focus:border-pink-400"
            />

            <a
              href={whatsappUrl}
              target="_blank"
              className="rounded-full bg-green-500 px-6 py-4 text-center font-bold text-white hover:bg-green-600"
            >
              Enviar consulta por WhatsApp
            </a>
          </div>
        </form>

        <div className="rounded-3xl bg-[#302747] p-8 text-white shadow-lg">
          <h2 className="text-3xl font-black">Kafira Boutique</h2>

          <p className="mt-4 text-white/80">
            Tienda online de moda femenina. Atención personalizada para ayudarte
            a elegir la prenda ideal.
          </p>

          <div className="mt-8 space-y-4">
            <p>
              <strong>WhatsApp:</strong> {company.whatsappDisplay}
            </p>

            <p>
              <strong>Atención:</strong> Online
            </p>

            <p>
              <strong>Ubicación:</strong> Venta online sin tienda física
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}