import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Category } from '../data/Category'

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <FlatList
      data={Category}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setSelectedCategory(item.productname)}>
          <Text style={[styles.dataheader, selectedCategory === item.productname && { color: "black", fontWeight: '500' }]}>
            {item.productname}
          </Text>
          {selectedCategory === item.productname ? <View style={styles.underline}></View> : null}
        </TouchableOpacity>
      )}
      horizontal
      ItemSeparatorComponent={() => <View style={{ paddingHorizontal: 10 }} />}
      showsHorizontalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  dataheader: {
    fontSize: 18,
    fontFamily: "Raleway-Medium",
    color: "black"
  },
  underline: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    width: '100%'
  }
})

export default Categories
