export default function Nosotros() {
  return (
    <main>
      <section className="bg-[#302747] px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
            Nuestra esencia
          </p>

          <h1 className="mt-4 text-5xl font-black md:text-6xl">
            Kafira Boutique
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/80">
            Somos una boutique online de moda femenina creada para mujeres que
            buscan verse elegantes, modernas y seguras en cada ocasión.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-black">Misión</h2>
          <p className="mt-4 text-gray-600">
            Ofrecer prendas femeninas modernas y versátiles, brindando una
            experiencia de compra sencilla, rápida y personalizada por WhatsApp.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-black">Visión</h2>
          <p className="mt-4 text-gray-600">
            Ser una boutique online reconocida por su estilo, atención cercana y
            selección de prendas para mujeres auténticas.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-black">Estilo</h2>
          <p className="mt-4 text-gray-600">
            Elegancia, comodidad y tendencia en cada prenda. Moda pensada para
            acompañarte en tu día a día.
          </p>
        </div>
      </section>
    </main>
  );
}