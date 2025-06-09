


import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Source/Screens/HomeScreen';
import Productdetailscreen from './Source/Screens/Productdetailscreen';
import Cartscreen from './Source/Screens/Cartscreen';
import { CartProvider } from './Source/Screens/Context/CartContext';
import AuthScreen from './Source/Screens/Authscreen';
import ChatbotScreen from './Source/Screens/ChatbotScreen';

const Stack =createNativeStackNavigator();
import Toast, { BaseToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#000', backgroundColor: '#000' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff', // white text
      }}
      text2Style={{
        fontSize: 14,
        color: '#ccc', // lighter gray if you use text2
      }}
      renderLeadingIcon={()=>null}
    />
  ),
  // You can also customize 'error', 'info' here similarly
};

const App = () => {
  return (
    <>
    <CartProvider>

    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={Productdetailscreen} />
        <Stack.Screen name="Cart" component={Cartscreen} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        </Stack.Navigator>
    </NavigationContainer>
        </CartProvider>
        <Toast config={toastConfig}/>
        </>
  )
}

export default App






