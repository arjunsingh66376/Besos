import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useCart } from '../Screens/Context/CartContext';
import CartItem from '../Component/CartItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientButton from '../Component/Gradientbutton';
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-toast-message';


const CartScreen = () => {
  const { cartItems } = useCart();
  const navigation = useNavigation();

  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1);
  }, 0);

  // handle payment  button 

// Inside your Checkout button onPress
const handlePayment = () => {
  var options = {
    description: 'Order Payment',
    image: 'https://your-logo-url.com/logo.png',
    currency: 'INR',
    key: 'rzp_test_Q1l5veFa2pHJFF',
    amount: total * 100,
    name: 'Besos',
    prefill: {
      email: 'user@example.com',
      contact: '9999999999',
      name: 'Test User'
    },
    theme: { color: '#000' }
  };

  RazorpayCheckout.open(options)
    .then((data) => {
      Toast.show({
        type: 'success',
        text1: 'Payment Successful',
        text2: `Payment ID: ${data.razorpay_payment_id}`,
        position: 'bottom',
        visibilityTime: 3000,
      });
      // Navigate to success screen if needed
    })
    .catch((error) => {
      if (error.code === 'PAYMENT_CANCELLED') {
        Toast.show({
          type: 'info',
          text1: 'Transaction Declined',
          text2: 'You cancelled the payment.',
          position: 'bottom',
          visibilityTime: 3000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Payment Failed',
          text2: error.description || 'Something went wrong. Please try again.',
          position: 'bottom',
          visibilityTime: 4000,
        });
      }
    });
};



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
            onPress={handlePayment}
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
