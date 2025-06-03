import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { font } from '../../assets/fonts/font'

const Productcard = ({item,navigation}) => {


   
  
  return (
    // card container
    <TouchableOpacity onPress={()=>navigation.navigate('Product',{item})} style={styles.cardcontainer}>
        {/* image container */}
     <View style={styles.imagecont}>
        <Image style={styles.img} source={{uri:item.image}}/>
     </View>
     {/* information about product */}
     <View style={styles.infocont}>
        <Text style={styles.pname} numberOfLines={1}>{item.name} </Text>
        <Text style={styles.brandname} numberOfLines={1}>{item.brandname}</Text>
        <Text style={styles.price} >{item.price}</Text>

     </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    // card container
    cardcontainer:{width:"48%",height:230,elevation:10,backgroundColor:"white",marginVertical:20,borderRadius:10 ,padding:10,  }, 

    // image container
    imagecont:{height:"55%",
        width:"100%",  
        borderRadius:10,
        backgroundColor:"lightgray",
        resizeMode:'center',
        borderWidth:1,
        padding:5
    },
    img:{width:"100%",height:"100%",resizeMode:'center'},
    // info container
    infocont:{
        flex:1,
    // borderWidth:1,s
    
        padding:1
    },
    pname:{fontFamily:font.bold,
      fontSize:16 ,
      marginVertical:5,
      color:"black"
    },
    brandname:{fontFamily:font.regular ,fontSize:15, paddingVertical:4
    },
    price:{fontFamily:font.bold,paddingVertical:1,
        color:"gray",
        fontSize:15
    },
})
export default Productcard
