import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useCart } from '../Screens/Context/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.brand}>{item.brandname}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <Pressable style={styles.qtyBtn} onPress={handleDecrease}>
            <Ionicons name="remove" size={18} color="#fff" />
          </Pressable>

          <Text style={styles.qtyNumber}>{item.quantity}</Text>

          <Pressable style={styles.qtyBtn} onPress={handleIncrease}>
            <Ionicons name="add" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  brand: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  qtyBtn: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 6,
  },
  qtyNumber: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartItem;
