import 'react-native-get-random-values'
import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
//   const [fontsLoaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   const [isFirstLaunch, setIsFirstLaunch] = useState(null);

//   // Vérifier la première ouverture
//   useEffect(() => {
//     const checkFirstLaunch = async () => {
//       try {
//         const hasLaunched = await AsyncStorage.getItem('hasLaunched');
//         if (hasLaunched === null) {
//           // Première ouverture
//           setIsFirstLaunch(true);
//           await AsyncStorage.setItem('hasLaunched', 'true');
//         } else {
//           // Déjà ouvert
//           setIsFirstLaunch(false);
//         }
//       } catch (error) {
//         console.error('Erreur lors de la vérification de la première ouverture :', error);
//       }
//     };

//     checkFirstLaunch();
//   }, []);

//   // Masquer l'écran de chargement lorsque les polices sont chargées
//   useEffect(() => {
//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   // Attendre que les polices et l'état `isFirstLaunch` soient prêts
//   if (!fontsLoaded || isFirstLaunch === null) {
//     return null; // Afficher un écran de chargement si nécessaire
//   }

  return (
    <View style={{ flex: 1 }}>
    <Stack screenOptions={{ headerShown: false }}>
      {/* {isFirstLaunch ? (
        <Stack.Screen name="index" options={{ headerShown: false }} />
      ) : ( */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* )} */}
    </Stack>
  </View>
  );
}
