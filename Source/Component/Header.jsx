import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation =useNavigation();
  return (
    <View style={styles.headerpart}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color='black'></Ionicons>
      </TouchableOpacity>
        <Feather name ="heart" size={30} color='black'> </Feather>
  
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerpart:{
        flexDirection:"row",
        display:"flex",
        justifyContent:"space-between",
      

    }
})