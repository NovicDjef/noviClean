import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Platform, TouchableOpacity } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchMenusRapide } from '@/redux/menusRapideSlice';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
// import { toggleFavorite } from "@/redux/favoritesSlice";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { color } from '@rneui/themed/dist/config';


// const SkeletonItem = () => (
//   <View style={styles.imageContainer}>
//     <LinearGradient
//       colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
//       style={styles.skeletonImage}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//     />
//     <View style={styles.skeletonText} />
//     <View style={[styles.favoriteButton, { backgroundColor: '#e0e0e0' }]} />
//   </View>
// );

const data = [
  { id: 1, name: "Chaussure", icon: "water" },
  { id: 5, name: "Accessoires", icon: "watch" },
  { id: 3, name: "Électro", icon: "leaf" },
  { id: 4, name: "Habits", icon: "flame" },
  { id: 2, name: "Huile", icon: "flask" },
  { id: 6, name: "Cosmétiques", icon: "rose" },
];
const Categories = () => {
 

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <View style={styles.iconsCategories}>
        <Ionicons style={styles.image} name={item.icon} size={25} />
      </View>
      <Text style={styles.description}>{item.name}</Text>  
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.id || index).toString()}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  listContent: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 2,
    position: 'relative',
  },
  iconsCategories: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: Colors.primaryDark + 30,
    marginHorizontal: 14,
    marginTop: 8,
  },
  image: {
    alignItems: "center",
    color: Colors.primaryDark
  },
  description: {
    marginTop: 4,
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  skeletonImage: {
    width: Platform.OS === 'ios' ? 80 : 70,
    height: Platform.OS === 'ios' ? 80 : 70,
    borderRadius: 10,
  },
  skeletonText: {
    marginTop: 4,
    width: 60,
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default Categories;