import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Source/Screens/HomeScreen';
import Productdetailscreen from './Source/Screens/Productdetailscreen';
import Cartscreen from './Source/Screens/Cartscreen';
import { CartProvider } from './Source/Screens/Context/CartContext';
import AuthScreen from './Source/Screens/Authscreen';
import Chatbotscreen from './Source/Screens/Chatbotscreen';
const Stack =createNativeStackNavigator();
const App = () => {
  return (
    <CartProvider>

    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={Productdetailscreen} />
        <Stack.Screen name="Cart" component={Cartscreen} />
        <Stack.Screen name="Chatbot" component={Chatbotscreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
        </CartProvider>
  )
}

export default App






