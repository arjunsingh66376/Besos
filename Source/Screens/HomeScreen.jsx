import { View, Text, StyleSheet, Image, TextInput, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'

import Categories from '../Component/Categories'
import Productcard from '../Component/Productcard'
import { smartwatch } from '../data/Smartwatch'
import { buds } from '../data/Buds'
import {  mouse } from '../data/Mouse'
import { television } from '../data/Television'
import { laptop } from '../data/Laptop'
import Icon from 'react-native-vector-icons/Ionicons' // 🛒 Vector Icon import

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Smart Watch');
  const [searchQuery, setSearchQuery] = useState('');

  const getAllData = () => {
    return [...smartwatch, ...buds];
  };

  const getDataForCategory = () => {
    if (searchQuery.trim() !== '') {
      const lowerSearch = searchQuery.toLowerCase();
      return getAllData().filter((item) =>
        item.name.toLowerCase().includes(lowerSearch)
      );
    }

    // No search query: return selected category only
    switch (selectedCategory) {
      case 'Smart Watch':
        return smartwatch;
      case 'Buds':
        return buds;
        case'Mouse':
        return mouse ;
        case'Television':
        return television ;
        case'Laptop':
        return laptop ;
      default:
        return [];
    }
  };

  const filteredData = getDataForCategory();

  return (
    <View style={Styles.Container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={Styles.headline}>Find Your Suitable Tech Now.</Text>
            <View style={Styles.maininputcont}>
              <View style={Styles.inputwrapper}>
                <Image style={Styles.searchincon} source={require('../../Source/assets/icons/icons8-search-50.png')} />
                <TextInput
                  style={Styles.textinput}
                  placeholder='search product'
                  placeholderTextColor="darkgray"
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                />
              </View>

              {/* 🛒 Cart icon */}
              <Pressable style={Styles.categoryicon} onPress={() => navigation.navigate('Cart')}>
                <Icon name="cart-outline" size={35} color="black" />
              </Pressable>
            </View>

            <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </>
        }
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Productcard item={item} navigation={navigation} />}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListEmptyComponent={
          <Text style={Styles.noResultText}>No Results Found</Text>
        }
        contentContainerStyle={{ paddingBottom: 500 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const Styles = StyleSheet.create({
  Container: {
    backgroundColor: "white",
    padding: 20,
  },
  headline: {
    color: "black",
    fontSize: 36,
    fontFamily: 'Raleway-Bold'
  },
  maininputcont: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 30,
  },
  inputwrapper: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 200,
    height: 50,
    marginTop: 20,
    flexDirection: 'row',
    flex: 12,
    marginRight: 5
  },
  searchincon: {
    width: 25, height: 25, marginLeft: 10, alignSelf: 'center'
  },
  textinput: {
    marginHorizontal: 2,
    marginVertical: 2,
    flex: 1,
    padding: 12,
    fontSize: 18,
    color: "black",
  },
  categoryicon: {
    flexDirection: 'row',
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginTop: 15
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: 'gray',
    fontFamily: 'Raleway-Bold'
  }
})

export default HomeScreen;
