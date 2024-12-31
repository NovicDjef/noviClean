import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator, Animated, Easing, StyleSheet } from 'react-native'
import { BottomSheet } from '@rneui/themed';
import { CreditCard, PaymentOption, PromoCodeInput } from './PaymentComponents';

const PaymentBottomSheet = ({ isVisible, onClose }) => {
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSuccess) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isSuccess]);

  const handlePlaceOrder = () => {
    setIsLoading(true);
    // Simuler un appel API
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Reset après 3 secondes
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 2000);
  };
  const updateCardInfo = (field, value) => {
    let formattedValue = value;
    switch (field) {
      case 'number':
        formattedValue = value.replace(/\D/g, '').slice(0, 16);
        break;
      case 'name':
        formattedValue = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
        break;
      case 'expiry':
        formattedValue = formatExpiry(value);
        break;
      case 'cvv':
        formattedValue = value.replace(/\D/g, '').slice(0, 3);
        break;
    }
    setCardInfo(prev => ({ ...prev, [field]: formattedValue }));
  };
  const formatExpiry = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length >= 5) {
      const month = cleanValue.slice(0, 2);
      const year = cleanValue.slice(2, 6);
      return `${month}/${year}`;
    }
    return cleanValue;
  };

  const formatCardNumber = (number) => {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };

  const renderSuccessAnimation = () => (
    <Animated.View 
      style={[
        styles.successPopup, 
        { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <View style={styles.checkmarkCircle}>
        <View style={styles.checkmark}>
          <View style={[styles.checkmarkStem, styles.checkmarkDrawing]} />
          <View style={[styles.checkmarkKick, styles.checkmarkDrawing]} />
        </View>
      </View>
      <Text style={styles.successText}>Payment Successful!</Text>
    </Animated.View>
  );

  const paymentOptions = [
    { id: 'applepay', image: require('../assets/images/aa.webp') },
    { id: 'paypal', image: require('../assets/images/p.png') },
    { id: 'visa', image: require('../assets/images/v.png') },
    { id: 'mastercard', image: require('../assets/images/m.png') },
  ];


  return (
    <BottomSheet isVisible={isVisible} onBackdropPress={onClose}>
      <ScrollView style={{ backgroundColor: 'white', padding: 16, maxHeight: "100%", borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 6 }}>Payment</Text>
        
        <CreditCard
           number={formatCardNumber(cardInfo.number)}
          name={cardInfo.name}
          expiry={cardInfo.expiry}
        />

        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ marginTop: 16, marginBottom: 8, fontSize: 16, fontWeight: 'bold' }}>Choose payment method</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 8, marginBottom: 16 }}>
          {paymentOptions.map(option => (
            <PaymentOption
              key={option.id}
              image={option.image}
              isSelected={selectedPayment === option.id}
              onSelect={() => setSelectedPayment(option.id)}
            />
          ))}
        </View>

        <PromoCodeInput />

        <TextInput
          placeholder="Card Number"
          value={formatCardNumber(cardInfo.number)}
          onChangeText={(text) => updateCardInfo('number', text)}
          keyboardType="numeric"
          maxLength={19}
          style={styless.input}
        />
        <TextInput
          placeholder="Cardholder Name"
          value={cardInfo.name}
          onChangeText={(text) => updateCardInfo('name', text)}
          style={styless.input}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            placeholder="Expire Date"
            value={cardInfo.expiry}
            onChangeText={(text) => updateCardInfo('expiry', text)}
            keyboardType="numeric"
            maxLength={7} // MM/YYYY
            style={[styless.input, { width: '48%' }]}
          />
          <TextInput
            placeholder="CVV"
            value={cardInfo.cvv}
            onChangeText={(text) => updateCardInfo('cvv', text)}
            style={[styless.input, { width: '48%' }]}
            keyboardType="numeric"
            maxLength={3}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Place Order</Text>
          )}
        </TouchableOpacity>

        {isSuccess && renderSuccessAnimation()}
      </ScrollView>
    </BottomSheet>
  );
};

const styless = {
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      maxHeight: '80%',
    },
    placeOrderButton: {
      backgroundColor: 'black',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    successPopup: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    successText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      color: '#4CAF50',
    },
    checkmarkCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#4CAF50',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkmark: {
      width: 50,
      height: 25,
      marginTop: -5,
    },
    checkmarkDrawing: {
      backgroundColor: 'white',
      position: 'absolute',
    },
    checkmarkStem: {
      width: 3,
      height: 30,
      left: 26,
      top: -5,
      transform: [{ rotate: '45deg' }],
    },
    checkmarkKick: {
      width: 3,
      height: 15,
      left: 13,
      top: 16,
      transform: [{ rotate: '-45deg' }],
    },
  });
  
export default PaymentBottomSheet;