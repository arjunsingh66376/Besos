import React, { useEffect } from 'react'; // Removed useState, useContext for this simplified test
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity, // <<< Keep TouchableOpacity
  View,
  Dimensions, // <<< CRITICAL: Ensure this is imported
  Alert,
  // Removed Platform as it's not strictly needed without GradientButton/shadows
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import { useCart } from '../Screens/Context/CartContext'; // <-- Add this import

// Ensure these paths are correct relative to Productdetailscreen.jsx
import Header from '../Component/Header'; // Your Header component
import Productcarousel from '../Component/Productcarousel'; // Your Productcarousel component
// Removed: import GradientButton from '../Component/Gradientbutton'; // <<< REMOVED GradientButton import
// Removed: import { CartContext } from './Context/CartContext'; // <<< REMOVED CartContext import

const Productdetailscreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { addToCart } = useCart(); // <-- Use useCart
  const item = route.params?.item; // This is where your product data will come from

  // Removed useState (selectedColor)
  // Removed useContext (CartContext)
  // Removed handleAddToCart function

  useEffect(() => {
    console.log("Productdetailscreen (Plain TouchableOpacity) mounted.");
    console.log("Item data received:", item);

    if (!item) {
      console.warn("Productdetailscreen: 'item' is UNDEFINED or NULL. Cannot display details.");
    } else {
      console.log("Item name:", item.name);
      console.log("Item brandname:", item.brandname);
      console.log("Item price:", item.price);
      console.log("Item description value:", item.description);
      console.log("Item review:", item.review);
    }
  }, [item, route.params]);


  // Simple test function for the button's onPress
  const handleAddToCart = () => {
    addToCart(item);
    // Optionally navigate to cart:
    // navigation.navigate('Cart');
  };


  // Render an error message if product data is not available
  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Product data not available for this test.
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
            <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Main UI rendering with only Header, Productcarousel, specific item details, and a plain button
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>

        {/* Header Component */}
        <Header />

        {/* Product Carousel Component */}
        {item.images && item.images.length > 0 ? (
          <Productcarousel images={item.images} />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>No images available</Text>
            <Text style={styles.tempText}>Product Name: {item.name || 'N/A'}</Text>
          </View>
        )}

        {/* Displaying Name, Brand, Price, Description, Review */}
        <View style={styles.infoDisplayArea}>
          <Text style={styles.label}>Product Name:</Text>
          <Text style={styles.value}>{item.name || 'N/A'}</Text>

          <Text style={styles.label}>Brand:</Text>
          <Text style={styles.value}>{item.brandname || 'N/A'}</Text>

          <Text style={styles.label}>Price:</Text>
          <Text style={styles.priceValue}>{item.price ? `$${item.price.toFixed(2)}` : '$0.00'}</Text>

          <Text style={styles.label}>Description:</Text>
          <Text style={styles.descriptionText}>{item.details || 'No description available.'}</Text>

          <Text style={styles.label}>Review:</Text>
          <Text style={styles.reviewText}>{item.review || 'No review available yet.'}</Text>
        </View>

        {/* Replaced GradientButton with plain TouchableOpacity */}
        <View style={styles.bottomButtonWrapper}>
            <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>
                    Add to Cart - {item.price ? `$${item.price.toFixed(2)}` : '$0.00'}
                </Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default Productdetailscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding:10
  },
  scrollViewContent: {
    paddingBottom: 100, // Make space for the button at the bottom
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe0e0',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#cc0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  goBackButton: { // Kept if errorContainer uses it
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignSelf: 'center',
  },
  goBackText: { // Kept if errorContainer uses it
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noImageContainer: {
    width: Dimensions.get('window').width,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    marginTop: 15,
  },
  noImageText: {
    color: '#888888',
    fontSize: 16,
  },
  tempText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  infoDisplayArea: {
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginHorizontal: 20,
    backgroundColor: '#F9F9F9',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
    lineHeight: 22,
  },
  reviewText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
  },
  bottomButtonWrapper: {
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'center',
    width: '90%', // Align with the size of the previous GradientButton
  },
  // NEW STYLES FOR THE PLAIN ADD TO CART BUTTON
  addToCartButton: {
    backgroundColor: '#007AFF', // A standard blue color for the button
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // You can add shadow here if you want it to look like GradientButton
    // ...Platform.select for shadows
  },
  addToCartButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});