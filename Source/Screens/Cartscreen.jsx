import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useCart } from '../Screens/Context/CartContext';
import CartItem from '../Component/CartItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientButton from '../Component/Gradientbutton';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cartItems } = useCart();
  const navigation = useNavigation();

  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1);
  }, 0);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        {/* 🔙 Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* 🛒 Centered Title */}
        <View style={styles.titleContainer}>
          <Ionicons name="cart" size={24} color="#fff" />
          <Text style={styles.heading}>Cart</Text>
        </View>
      </View>

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CartItem item={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.fixedBar}>
          <GradientButton
            text={`Checkout - $${total}`}
            onPress={() => {
              console.log('Checkout pressed');
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'relative',
    backgroundColor: 'black',
    paddingVertical: 16,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 36, // aligns with paddingTop
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  empty: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  fixedBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default CartScreen;
