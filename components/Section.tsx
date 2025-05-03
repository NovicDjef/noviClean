import { View, Image, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {Colors} from '@/constants/Colors'
import { Link, Stack } from 'expo-router';


export default function Section({label, styless, href}) {
  return (
    <View style={[styles.container, styless]}>
        <View style={styles.UserInfo}>
        <Text style={styles.userName}>{label}</Text>
        </View>
        {/* <Link
          href={href}
      asChild
    > */}
        <TouchableOpacity style={styles.icons} >
            <Text style={styles.userName}> see all.. </Text>
            <Ionicons name='chevron-forward-outline' size={24} color={Colors.black}/>
        </TouchableOpacity>
        {/* </Link> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: Platform.OS === 'ios' ? 2 : 2,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  UserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  welcomText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black
  }
})