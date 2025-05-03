import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Platform, Dimensions } from 'react-native';
import React, { useReducer } from 'react';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

const productsData = [
  { id: '1', name: 'cleaning company', price: 100, image: require("../assets/images/1.avif") },
  { id: '2', name: 'Office Cleaning', price: 120, image: require("../assets/images/2.jpg") },
  { id: '3', name: 'House cleaning', price: 90, image: require("../assets/images/3.jpg") },
  { id: '4', name: 'kitchen cleaning', price: 80, image: require("../assets/images/4.webp") },
  { id: '5', name: 'Reebok Club C', price: 110, image: require("../assets/images/5.webp") },
  { id: '6', name: 'Converse All-Star', price: 95, image: require("../assets/images/2.jpg") },
];

export default function Produits() {

  const renderProduct = ({ item }) => (
    <Link  
    key={item.id}
    href={{
      pathname: `/detail/DetailJob`,
      params: { id: item.id, name: item.name, price: item.price, image: item.image },
    }}  
          asChild
        >
    <TouchableOpacity style={styles.card} 
      >
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.originalPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.gamePrice}>  ${ (item.price / 5).toFixed(2) }/h</Text>
      </View>
    </TouchableOpacity>
    </Link>
  );

  return (
    <FlatList
      data={productsData}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    padding: 4,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: COLORS.primaryDark + 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 140,
  },
  name: {
    ...FONTS.h4,
    padding: 8,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  originalPrice: {
    color: COLORS.secondaryBlack + 50,
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  gamePrice: {
    color: COLORS.primaryDark,
    fontWeight: 'bold',
  },
});
