export const products = [
  {
    item: "1001",
    categoria: "Vestidos",
    nombre: "Vestido Floral Elegante",
    descripcionCorta: "Vestido moderno con diseño floral.",
    descripcionLarga:
      "Vestido femenino ideal para salidas, reuniones y ocasiones especiales.",
    precio: 89.9,
    precioOferta: 79.9,
    tallas: ["S", "M", "L"],
    colores: ["Rosado", "Blanco"],
    imagen: "/images/productos/producto-1.jpg",
    imagen2: "/images/productos/producto-2.jpg",
    imagen3: "/images/productos/producto-3.jpg",
    stock: 10,
    destacado: "SI",
    estado: "ACTIVO",
  },
  {
    item: "1002",
    categoria: "Blusas",
    nombre: "Blusa Satinada",
    descripcionCorta: "Blusa elegante de acabado satinado.",
    descripcionLarga:
      "Blusa versátil con acabado elegante, perfecta para combinar con jeans o faldas.",
    precio: 59.9,
    precioOferta: "",
    tallas: ["S", "M"],
    colores: ["Negro", "Beige"],
    imagen: "/images/productos/producto-2.jpg",
    imagen2: "",
    imagen3: "",
    stock: 8,
    destacado: "SI",
    estado: "ACTIVO",
  },
  {
    item: "1003",
    categoria: "Jeans",
    nombre: "Jean Mom Fit",
    descripcionCorta: "Jean cómodo de corte mom fit.",
    descripcionLarga:
      "Jean moderno y cómodo, ideal para looks casuales.",
    precio: 99.9,
    precioOferta: "",
    tallas: ["28", "30", "32"],
    colores: ["Azul"],
    imagen: "/images/productos/producto-3.jpg",
    imagen2: "",
    imagen3: "",
    stock: 5,
    destacado: "SI",
    estado: "ACTIVO",
  },
];

export function createProductSlug(product) {
  return `${product.item}-${product.nombre}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}