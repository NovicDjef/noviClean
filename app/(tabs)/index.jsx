import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import Header from "../../components/Header"
import { Stack } from 'expo-router'
import Colors from "../../constants/Colors"
import Section from "../../components/Section"
import Categories from "../../components/Categories"
import Produits from "../../components/Produits"
import Slide from '../../components/Slide'

const Home = () => {
  return (
    <>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false}} />
        <View style={styles.content}>
         <Header />
        </View>
      </View>
      <ScrollView>
        <Slide />
        <Section styless  label="Categories"/>
        <Categories />
        <Section styless  label="Produits"/>
        <Produits />
      </ScrollView>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  content: {
    marginTop: 60,
  },
  UserData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
 

})

export default Home