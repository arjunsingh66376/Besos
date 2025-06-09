// Source/Screens/Context/CartContext.js

import React, { createContext, useContext, useState } from 'react';
import Toast from 'react-native-toast-message';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      );
      } else {
        // Initialize quantity to 1 when a new item is added
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    Toast.show({
      type: 'cartAddSuccess',
      text1: 'Item Added to Cart!',
      text2: `${product.name} has been added.`,
      visibilityTime: 2000,
    });

    console.log('Item added to cart:', product.name);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // This function is key for increment/decrement
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity, // Make sure updateQuantity is exposed
        clearCart,
        getTotalPrice,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);