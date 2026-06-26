const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTy0ea_J0iH9Tlclz8Vz02kegSo3w97j0TfkhIuCfiy2FHb55zS9KS_Oang5JojEdt6MTJQPJJmfvz8/pub?gid=0&single=true&output=csv";

let productsCache = null;

function parseCSV(text) {
  const rows = [];
  let current = "";
  let row = [];
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && nextChar === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(current);
      current = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (current || row.length) {
        row.push(current);
        rows.push(row);
        row = [];
        current = "";
      }
    } else {
      current += char;
    }
  }

  if (current || row.length) {
    row.push(current);
    rows.push(row);
  }

  return rows;
}

export function createProductSlug(product) {
  return `${product.item}-${product.nombre}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getProducts() {
  if (productsCache) {
    return productsCache;
  }

  const response = await fetch(SHEET_URL);

  if (!response.ok) {
    throw new Error("No se pudo cargar Google Sheets");
  }

  const text = await response.text();
  const rows = parseCSV(text);

  if (!rows.length) {
    return [];
  }

  const headers = rows[0].map((h) => h.trim());

  productsCache = rows
    .slice(1)
    .map((row) => {
      const product = headers.reduce((acc, header, index) => {
        acc[header] = row[index]?.trim() || "";
        return acc;
      }, {});

      return {
        ...product,
        item: product.item,
        precio: Number(product.precio) || 0,
        precioOferta: product.precioOferta ? Number(product.precioOferta) : "",
        precioMayor: product.precioMayor ? Number(product.precioMayor) : "",
        stock: Number(product.stock) || 0,
        tallas: product.tallas
          ? product.tallas.split(",").map((t) => t.trim())
          : [],
        colores: product.colores
          ? product.colores.split(",").map((c) => c.trim())
          : [],
      };
    })
    .filter((product) => product.estado?.trim().toUpperCase() === "ACTIVO");

  return productsCache;
}