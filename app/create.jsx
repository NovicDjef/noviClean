import { View, Text } from 'react-native'
import React from 'react'
import ColorList from '../components/ColorList'
import { Stack } from 'expo-router'

const Create = () => {
  return (
    <View>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <ColorList color="#78716c" />
    </View>
  )
}

export default Create