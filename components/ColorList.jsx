import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'

const ColorList = ({color}) => {
  return (
    <ScrollView 
      horizontal={true}  // Activer le défilement horizontal
      contentContainerStyle={[styles.container]}>
      {
        [1, 0.8, 0.5].map(opacity=> (
          <View 
            key={opacity} 
            style={[styles.color, {backgroundColor: color, opacity}]} 
          />
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    color: {
        width: 200,  // Fixer la largeur pour un défilement horizontal
        height: 120,
        borderRadius: 25,
        marginRight: -5,  // Ajouter un petit espace entre les éléments
        marginHorizontal: 10
    },
    container: {
      paddingVertical: 10, 
      height: 210,  // Limiter la hauteur pour le défilement horizontal
    }
})

export default ColorList;
