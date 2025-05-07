
 import React, { useState, useEffect, useRef } from 'react';
 import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator, Easing, StyleSheet } from 'react-native'
import { PromoCodeInput } from '../../components/PaymentComponents';
 import SearchLocationInput from "../../components/SearchLocationInput"
 import { COLORS } from '@/constants/theme';
 import HourDropdown from "../../components/HourDropdown"
 import SuperficieInput from "../../components/SuperficieInput"
 import TypeLocal from "../../components/TypeLocal"
 import { Ionicons } from '@expo/vector-icons';
 import DateTimePicker from "@react-native-community/datetimepicker";
 import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
 import
      Animated, {
     withTiming,
     useSharedValue,
     runOnJS,
   } from 'react-native-reanimated';


 const BookingHouse = () => {
   const [cardInfo, setCardInfo] = useState({
     number: '',
     name: '',
     expiry: '',
     cvv: ''
   });
   const [isLoading, setIsLoading] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
  //  const fadeAnim = useRef(new Animated.Value(0)).current;
  //  const scaleAnim = useRef(new Animated.Value(0)).current;
   const [form, setForm] = useState({
     name: "",
     dosage: "",
     frequency: "",
     duration: "",
     startDate: new Date(),
     times: ["09:00"],
     notes: "",
     reminderEnabled: true,
     refillReminder: false,
     currentSupply: "",
     refillAt: "",
   });
   // gestionjaysonburns@gmail.com
   // Gestion1%Burns     596532
   const headerShareValue = useSharedValue(80);
   const [showTimePicker, setShowTimePicker] = useState(false);
   const [showDatePicker, setShowDatePicker] = useState(false);
 
  function BackHandler() {
         router.back();
       }
 
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
 
   return (
    <>
      <StatusBar style='dark' />
      <ScrollView style={{ padding: 16, backgroundColor: "white"}}>
        <View style={{flexDirection: "row"}}>
          <Animated.View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                  backgroundColor: COLORS.primaryDark + 30,
                  marginTop: 40,
                }}
              >
                <Ionicons 
                  name='arrow-back' 
                  size={24}
                  onPress={() => {
                    setTimeout(() => {
                      headerShareValue.value = withTiming(80, {
                        duration: 500
                      }, () => {
                        runOnJS(BackHandler)();
                      });
                    }, 100);
                  }}
                  color={COLORS.primaryDark}
                />
          </Animated.View>
          <View style={{ marginTop: 45, right: -22}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 6 }}>Informations</Text>
          </View>
        </View>
       <SearchLocationInput />

       <TextInput
         placeholder="Name of Company"
         value={formatCardNumber(cardInfo.number)}
         onChangeText={(text) => updateCardInfo('number', text)}
         keyboardType="numeric"
         maxLength={19}
         style={styless.input} />
         <TextInput
         placeholder="Nom Responsable"
         value={formatCardNumber(cardInfo.number)}
         onChangeText={(text) => updateCardInfo('number', text)}
         keyboardType="numeric"
         maxLength={19}
         style={styless.input} />
         <TextInput
         placeholder="Numero telephone"
         value={formatCardNumber(cardInfo.number)}
         onChangeText={(text) => updateCardInfo('number', text)}
         keyboardType="numeric"
         maxLength={19}
         style={styless.input} />
       <TextInput
         placeholder="Email Adress "
         value={cardInfo.name}
         onChangeText={(text) => updateCardInfo('name', text)}
         style={styless.input} />

        <TypeLocal />
        <HourDropdown />

       <SuperficieInput />

       <View style={styles.section}>

         <TouchableOpacity
           style={styles.dateButton}
           onPress={() => setShowDatePicker(true)}
         >
           <View style={styles.dateIconContainer}>
             <Ionicons name="calendar" size={18} color={COLORS.primaryDark} />
           </View>
           <Text style={styles.dateButtonText}>
             Starts {form.startDate.toLocaleDateString()}
           </Text>
           <Ionicons name="chevron-forward" size={20} color="#666" />
         </TouchableOpacity>

         {showDatePicker && (
           <DateTimePicker
             value={form.startDate}
             mode="date"
             onChange={(event, date) => {
               setShowDatePicker(false);
               if (date) setForm({ ...form, startDate: date });
             } } />
         )}

         {form.frequency !== "As needed" && (
           <View style={styles.timesContainer}>
             <Text style={styles.timesTitle}>Heures d’accès </Text>
             {form.times.map((time, index) => (
               <TouchableOpacity
                 key={index}
                 style={styles.timeButton}
                 onPress={() => {
                   setShowTimePicker(true);
                 } }
               >
                 <View style={styles.timeIconContainer}>
                   <Ionicons name="time-outline" size={18} color={COLORS.primaryDark} />
                 </View>
                 <Text style={styles.timeButtonText}>{time}</Text>
                 <Ionicons name="chevron-forward" size={20} color="#666" />
               </TouchableOpacity>
             ))}
           </View>
         )}

         {showTimePicker && (
           <DateTimePicker
             value={(() => {
               const [hours, minutes] = form.times[0].split(":").map(Number);
               const date = new Date();
               date.setHours(hours, minutes, 0, 0);
               return date;
             })()}
             mode="time"
             onChange={(event, date) => {
               setShowTimePicker(false);
               if (date) {
                 const newTime = date.toLocaleTimeString("default", {
                   hour: "2-digit",
                   minute: "2-digit",
                   hour12: false,
                 });
                 setForm((prev) => ({
                   ...prev,
                   times: prev.times.map((t, i) => (i === 0 ? newTime : t)),
                 }));
               }
             } } />
         )}
       </View>

       <View style={styles.section}>
         <View style={styles.textAreaContainer}>
           <TextInput
             style={styles.textArea}
             placeholder="Add notes or special instructions..."
             placeholderTextColor="#999"
             value={form.notes}
             onChangeText={(text) => setForm({ ...form, notes: text })}
             multiline
             numberOfLines={4}
             textAlignVertical="top" />
         </View>
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
     </ScrollView></>
   );
 };
 
 const styless = {
   input: {
     backgroundColor: '#f0f0f0',
     borderColor: '#ddd',
     padding: 10,
     marginBottom: 10,
     borderRadius: 8,
     height: 40,
   },
 };
 
 
 const styles = StyleSheet.create({
     container: {
       backgroundColor: 'white',
       padding: 16,
      //  maxHeight: '80%',
      paddingTop: -40
      
     },
     placeOrderButton: {
       backgroundColor: COLORS.primaryDark,
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
       color: COLORS.primaryDark,
     },
     checkmarkCircle: {
       width: 100,
       height: 100,
       borderRadius: 50,
       backgroundColor: COLORS.primaryDark,
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
       pickerContainer: {
         borderWidth: 1,
         borderColor: '#ccc',
         borderRadius: 8,
         overflow: 'hidden',
       },
       picker: {
         height: 50,
         width: '100%',
       },
       Estimated: {
         backgroundColor: '#f0f0f0',
         borderColor: '#ddd',
         padding: 10,
         marginBottom:10,
         borderRadius: 8,
         height: 40,
         marginTop: 12,
         flexDirection: "row",
         justifyContent: 'space-between',
         alignItems: 'center'
       },
 
       dateButton: {
         flexDirection: "row",
         alignItems: "center",
         borderRadius: 8,
         padding: 8,
         marginTop: 15,
         backgroundColor: '#f0f0f0',
         borderColor: "#e0e0e0",
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.05,
         shadowRadius: 8,
         elevation: 2,
       },
       dateIconContainer: {
         width: 30,
         height: 30,
         borderRadius: 20,
         backgroundColor: COLORS.primaryDark +30,
         justifyContent: "center",
         alignItems: "center",
         marginRight: 10,
       },
       dateButtonText: {
         flex: 1,
         fontSize: 16,
         color: "#333",
       },
       card: {
         backgroundColor: "white",
         borderRadius: 16,
         padding: 20,
         borderWidth: 1,
         borderColor: "#e0e0e0",
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.05,
         shadowRadius: 8,
         elevation: 2,
       },
       switchRow: {
         flexDirection: "row",
         justifyContent: "space-between",
         alignItems: "center",
       },
       switchLabelContainer: {
         flexDirection: "row",
         alignItems: "center",
         flex: 1,
       },
       iconContainer: {
         width: 40,
         height: 40,
         borderRadius: 20,
         backgroundColor: "#f5f5f5",
         justifyContent: "center",
         alignItems: "center",
         marginRight: 15,
       },
       timesContainer: {
         marginTop: 20,
       },
       timesTitle: {
         fontSize: 16,
         fontWeight: "600",
         color: "#333",
         marginBottom: 10,
       },
       timeButton: {
         flexDirection: "row",
         alignItems: "center",
         backgroundColor: "#f0f0f0",
         borderRadius: 8,
         padding: 8,
         marginBottom: 10,
         borderColor: "#e0e0e0",
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.05,
         shadowRadius: 8,
         elevation: 2,
       },
       timeIconContainer: {
         width: 30,
         height: 30,
         borderRadius: 20,
         backgroundColor: COLORS.primaryDark +30,
         justifyContent: "center",
         alignItems: "center",
         marginRight: 10,
       },
       timeButtonText: {
         flex: 1,
         fontSize: 16,
         color: "#333",
       },
       textAreaContainer: {
         backgroundColor: "white",
         borderRadius: 16,
         borderWidth: 1,
         borderColor: "#e0e0e0",
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.05,
         shadowRadius: 8,
         elevation: 2,
       },
       section: {
         marginBottom: 20,
       },
       textArea: {
         height: 100,
         padding: 15,
         fontSize: 16,
         color: "#333",
       },
 
   });
   
 export default BookingHouse;