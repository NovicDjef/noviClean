import { View, Text } from 'react-native'
import React from 'react'
import ColorList from '../components/ColorList'
import GridProduit from '../components/GridProduit'

const Home = () => {
  return (
    <View>
      <ColorList color="#0891b2" />
      <GridProduit />
    </View>
  )
}

export default Home