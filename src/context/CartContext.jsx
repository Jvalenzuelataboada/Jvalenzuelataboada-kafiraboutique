import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const CART_KEY = "kafira_cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const getFinalPrice = (product) => product.precioOferta || product.precio;

  const addToCart = (product) => {
    const stock = Number(product.stock) || 0;

    if (stock <= 0) return;

    const exists = cart.find((item) => item.item === product.item);

    if (exists) {
      if (exists.cantidad >= stock) return;

      setCart(
        cart.map((item) =>
          item.item === product.item
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, cantidad: 1 }]);
    }
  };

  const decreaseQuantity = (itemCode) => {
    setCart(
      cart
        .map((item) =>
          item.item === itemCode
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const removeFromCart = (itemCode) => {
    setCart(cart.filter((item) => item.item !== itemCode));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce(
    (acc, item) => acc + getFinalPrice(item) * item.cantidad,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}