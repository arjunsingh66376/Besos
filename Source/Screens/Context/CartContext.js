import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


// Inside your CartContext.js

const increaseQuantity = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }
        : item
    )
  );
};



  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id && item.selectedColor === product.selectedColor);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart,increaseQuantity,decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Add this hook and export it
export const useCart = () => useContext(CartContext);
