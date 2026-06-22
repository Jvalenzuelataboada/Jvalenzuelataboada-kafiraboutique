import { company } from "../data/company";

export function createWhatsAppLink(message = "") {
  const text = message
    ? `?text=${encodeURIComponent(message)}`
    : "";

  return `https://wa.me/${company.whatsapp}${text}`;
}

export const whatsappMessages = {
  home: `Hola 👋, estoy visitando la página web de Kafira Boutique y quisiera recibir más información sobre sus productos.`,

  navbar: `Hola 👋, estoy navegando en Kafira Boutique y quisiera realizar una consulta.`,

  floating: `Hola 👋, quisiera recibir asesoría sobre los productos disponibles en Kafira Boutique.`,

  contacto: `Hola 👋, quisiera comunicarme con Kafira Boutique para realizar una consulta.`,

  catalogo: `Hola 👋, estoy revisando el catálogo y quisiera recibir más información sobre algunos productos.`,
};