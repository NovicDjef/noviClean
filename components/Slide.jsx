import { View, Text, StyleSheet, Dimensions, Platform, Image } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';

const { width } = Dimensions.get('window');

export default function Slide() {
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
        <Image
            source={require("../assets/images/6.jpg")}
            style={styles.image}
        />
        <Text style={styles.descOff}>20% Off</Text>
        <Text style={styles.description}>Special promo pour cette semaine Obtenez jusqu'a 20% de reduction</Text>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 4,
      marginHorizontal: 20
    },
    imageContainer: {
      width: width - 40, // Adjust width as needed
      height: Platform.OS === 'ios' ? 150 : 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 28,
      overflow: 'hidden',
      backgroundColor: '#e0e0e0',
    },
    imageContainerr: {
      alignItems: 'center',
      marginHorizontal: 2,
      position: 'absolute',
    },
    descOff: {
        position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      color: Colors.primaryDark,
      padding: 20,
      fontSize: 26,
      fontWeight: "bold"
    },
    description: {
      marginHorizontal: 6,
      position: 'absolute',
      top: 10,
      color: Colors.primaryDark,
      fontSize: 14,
      fontWeight: 500
    },
  });