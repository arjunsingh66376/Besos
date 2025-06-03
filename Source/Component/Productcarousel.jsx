import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';

const screenWidth = Dimensions.get('window').width;

const DOT_WIDTH = 8;
const ACTIVE_DOT_WIDTH = 24;

const ProductCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out invalid images once
  const filteredImages = images.filter(img => img);

  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View>
      <FlatList
        data={filteredImages}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={{ uri: item }} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        snapToAlignment="center"
        snapToInterval={screenWidth}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />

      <View style={styles.dotsContainer}>
        {filteredImages.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <View
              key={index}
              style={[
                styles.dot,
                isActive && styles.activeDot,
              ]}
            />
          );
        })}
        
      </View>
      
    </View>
  );
};

export default ProductCarousel;

const styles = StyleSheet.create({
  imageWrapper: {
    width: screenWidth,
    height: 260, // ✅ fixed: use number not string
    marginTop: 15,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // ✅ shows full image without cropping
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    height: 8,
    width: DOT_WIDTH,
    borderRadius: 4,
    backgroundColor: '#aaa',
    marginHorizontal: 4,
  },
  activeDot: {
    width: ACTIVE_DOT_WIDTH,
    backgroundColor: '#000',
  },
});
