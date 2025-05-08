import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../../constants/theme'

const Explore = () => {
  return (
     <><StatusBar style='dark' />
        <View style={styles.container}>
    
          <View style={styles.UserData}>
             
            <View style={{ gap: 3, left: 2 }}>
              <Text style={styles.welcomText}>Welcome to NoviClean</Text>
            </View>
          </View>
          
        </View></>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  UserData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomText: {
    fontSize: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
  },
  Notifications: {
    width: Platform.OS === 'ios' ? 20 : 18,
    height: Platform.OS === 'ios' ? 20 : 18,
    borderRadius: 10,
    backgroundColor: COLORS.red,
    position: 'absolute', 
    top: Platform.OS === 'ios' ? -10 : -9, 
    right: -3,  
    alignItems: 'center',
    justifyContent: 'center',}
})
export default Explore