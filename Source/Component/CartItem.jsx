// components/CartItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../Screens/Context/CartContext'; // now valid!

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'black',
    marginVertical: 8,
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: 'white',
  },
  remove: {
    color: '#ff0000',
    fontSize: 16,
    marginTop: 6,
    fontWeight:'800'
  },
});

export default CartItem;
