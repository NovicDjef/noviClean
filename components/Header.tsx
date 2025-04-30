import { View, Image, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router';
// import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
// import { useTranslation } from '../utils/useTranslation';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '@/constants/theme';


export default function Header() {
  // const { t } = useTranslation();
  // const UserData = useSelector(state => state.Auth.user)
  // const { UserData, token, isAuthenticated, isLoading, error } = useSelector(state => state.user.auth);
  const router = useRouter();
// const notification = useSelector((state) => state.notification.data);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userDataString = await AsyncStorage.getItem('userData'); // Récupère la chaîne JSON de `userData`
        
//         if (userDataString) {
//           const userData = JSON.parse(userDataString); // Convertit la chaîne JSON en objet
//           setUser(userData); // Met à jour l'état `user` avec l'objet JSON
//         }
//       } catch (error) {
//         console.error('Error retrieving user data:', error);
//       }
//     };
//     // console.log("User :", user)
//     fetchUserData();  
//   }, []);
  const navigateToNotifications = () => {
    router.push("./Notifications")
  }
  return (
    <><StatusBar style='light' />
    <View style={styles.container}>
        <View style={{ gap: 3, left: 2 }}>
          <Text style={styles.userName}>
            Solde compte
          </Text>
          <View style={styles.soldeContainer}>
          <Ionicons name='wallet' size={24} color="white"/>
            <Text style={styles.priceSolde}>
              100 $
            </Text>
          </View>
        </View>
        <View style={styles.rechargeCompte}>
          <View style={{justifyContent: "center", alignItems: "center", marginRight: 20}}>
            <View style={styles.iconSend}>
              <Ionicons name='arrow-down' size={24} color="white"/>
            </View>
            <Text style={{ color: "white" }}>Recharger Compte</Text>
          </View>
        </View>
      <View style={[styles.icons]}>
        <TouchableOpacity onPress={navigateToNotifications}>
          <View style={styles.Notifications}>
            <Text style={{ color: COLORS.white }}>1</Text>
          </View>
          <Ionicons name='notifications-outline' size={25} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View></>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceSolde: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8
  },
  soldeContainer: {
    flexDirection: "row",
    marginLeft:2
  },
  UserData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  rechargeCompte: {
    
  },
  iconSend: {
    width: 35, 
    height: 35,
    backgroundColor: Colors.gray + 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  userName: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: 500
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