import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import Header from '../Component/Header';
import Productcarousel from '../Component/Productcarousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { font } from '../../assets/fonts/font';
import GradientButton from '../Component/Gradientbutton';
import { useContext } from 'react';
import { CartContext } from './Context/CartContext'; // adjust path as needed

const COLORS = [
  { label: 'Silver', color: '#C0C0C0' },
  { label: 'Bright Orange', color: '#FFA500' },
  { label: 'Starlight', color: '#F5F5DC' },
];

const Productdetailscreen = () => {
  const item = useRoute().params.item;
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab] = useState('Details');

  // for cartcontext 
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (!selectedColor) {
      Alert.alert('Please select a color!');
      return;
    }
  
    const productWithColor = {
      ...item,
      selectedColor,
    };
  
    addToCart(productWithColor);
  
    // Delay the alert slightly to ensure activity is attached
    setTimeout(() => {
      Alert.alert('Item added to cart!');
    }, 100); // 100ms delay is usually safe
  };
  


  return (
    <View style={styles.container}>
      {/* ScrollView with padding bottom to avoid overlap with fixed button */}
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* header section */}
        <Header />

        {/* product carousel */}
        <Productcarousel images={item.images} />

        {/* product title and information */}
        <View style={styles.titlecont}>
          <View style={styles.titlewrapper}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.brandname}>{item.brandname}</Text>
          </View>

          <View style={styles.ratingBox}>
            <AntDesign name="star" size={18} color="#f1c40f" />
            <Text style={styles.ratingtext}>4.5</Text>
          </View>
        </View>

        {/* colors section */}
        <View style={styles.colorsheading}>
          <Text style={styles.colorheadtext}>Colors</Text>
        </View>
        <View style={styles.colorswrapper}>
          {COLORS.map((colorItem, index) => {
            const isSelected = selectedColor === colorItem.label;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.colorbtn, isSelected && { borderColor: 'blue' }]}
                onPress={() => setSelectedColor(colorItem.label)}
              >
                <View style={styles.colorbtncontent}>
                  <View
                    style={[styles.circle, isSelected && { backgroundColor: colorItem.color }]}
                  />
                  <Text
                    style={[styles.colorbtntext, { color: isSelected ? '#000' : 'gray' }]}
                  >
                    {colorItem.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* details and review tab bar */}
        <View style={styles.tabContainer}>
          <View style={styles.tabBar}>
            {['Details', 'Reviews'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={styles.tabButton}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
                {activeTab === tab && <View style={styles.tabUnderline} />}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tabContent}>
            {activeTab === 'Details' ? (
              <Text style={styles.tabContentText}>{item.details}</Text>
            ) : (
              <Text style={styles.tabContentText}>{item.review}</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Fixed gradient button container */}
      <View style={styles.fixedButtonContainer}>
      <GradientButton price={item.price} onPress={ handleAddToCart} />
      </View>
    </View>
  );
};

export default Productdetailscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 20,
    paddingBottom: 100, // give enough space for fixed button
  },

  // Product info
  titlecont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  titlewrapper: {
    flexShrink: 1,
    paddingRight: 5,
  },
  name: {
    fontFamily: font.black,
    fontSize: 21,
  },
  brandname: {
    fontFamily: font.regular,
    fontSize: 18,
    color: '#666',
    marginTop: 2,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingtext: {
    fontFamily: font.regular,
    fontSize: 16,
    color: '#333',
    marginLeft: 4,
    lineHeight: 20,
    paddingTop: 1,
  },

  // Color section
  colorsheading: {
    marginTop: 15,
    marginBottom: 15,
  },
  colorheadtext: {
    fontFamily: font.bold,
    fontSize: 20,
  },
  colorswrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorbtn: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
  },
  colorbtncontent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorbtntext: {
    fontFamily: font.regular,
    fontSize: 16,
    marginLeft: 6,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'transparent',
  },

  // Details and reviews tab bar
  tabContainer: {
    marginTop: 20,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
  },
  tabText: {
    fontFamily: font.regular,
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: '#000',
    fontFamily: font.bold,
  },
  tabUnderline: {
    height: 3,
    backgroundColor: '#000',
    marginTop: 5,
    width: '50%',
  },
  tabContent: {
    paddingVertical: 10,
  },
  tabContentText: {
    fontFamily: font.regular,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    paddingBottom: 20,
  },

  // Fixed button container
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff', // white background to overlay content behind
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
