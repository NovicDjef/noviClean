import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



export const CreditCard = ({ number, name, expiry }) => (
    <LinearGradient
      colors={['#20B2AA', '#003366']}
      style={styles.card}
    >
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/v.png')} 
          style={styles.cbcLogo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.chipContainer}>
        <Image 
          source={require('../assets/images/sim.png')} 
          style={styles.chip}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.cardNumber}>
        {number ? number.replace(/(\d{4})/g, '$1 ').trim() : '**** **** **** ****'}
      </Text>
      <View style={styles.cardInfo}>
        <View>
          <Text style={styles.label}>CARD HOLDER</Text>
          <Text style={styles.value}>{name || 'YOUR NAME'}</Text>
        </View>
        <View>
          <Text style={styles.label}>EXPIRES</Text>
          <Text style={styles.value}>{expiry || 'MM/YY'}</Text>
        </View>
      </View>
    </LinearGradient>
  );

export const PaymentOption = ({ image, isSelected, onSelect }) => (
  <TouchableOpacity onPress={onSelect} style={{ opacity: isSelected ? 1 : 0.5, }}>
    <Image source={image} style={{ width: 50, height: 30 }} resizeMode="contain" />
  </TouchableOpacity>
);

export const PromoCodeInput = () => (
  <View style={{ flexDirection: 'row', marginBottom: 16 }}>
    <TextInput
      placeholder="Promo Code"
      style={{ flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 4 }}
    />
    <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, borderRadius: 4, marginLeft: 8 }}>
      <Text style={{ color: 'white' }}>Apply</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
    card: {
      width: 340,
      height: 190,
      borderRadius: 10,
      padding: 20,
      justifyContent: 'center',
      marginHorizontal: 25,
    },
    logoContainer: {
      alignItems: 'flex-end',

    },
    cbcLogo: {
      width: 50,
      height: 20,
    },
    chipContainer: {
      marginBottom: 20,
    },
    chip: {
      width: 50,
      height: 40,
    },
    cardNumber: {
      fontSize: 18,
      color: 'white',
      letterSpacing: 2,
      marginBottom: 20,
    },
    cardInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: 10,
      color: '#aaa',
      marginBottom: 5,
    },
    value: {
      fontSize: 14,
      color: 'white',
    },
 
  });