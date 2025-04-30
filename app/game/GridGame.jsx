import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import Colors from '../../constants/Colors';
import { Stack } from 'expo-router'

// Génération de numéros mélangés aléatoirement
const generateShuffledNumbers = () => {
  const numbers = Array.from({ length: 40 }, (_, i) => i);
  return numbers.sort(() => Math.random() - 0.5);
};

// Définition du numéro gagnant
const WINNING_NUMBER = Math.floor(Math.random() * 40);


const GridGame = () => {
  const { id, name, price, image } = useLocalSearchParams();
  // const product = productsData.find(p => p.id === id);
  const [revealed, setRevealed] = useState({});
  const [showAnimation, setShowAnimation] = useState(null);
  const shuffledNumbers = generateShuffledNumbers();
  const router = useRouter();

  // Fonction pour gérer le clic sur une carte
  const handlePress = (index, number) => {
    if (revealed[index]) return;
  
    setRevealed((prev) => ({ ...prev, [index]: true }));
  
    setTimeout(() => {
      if (number === WINNING_NUMBER) {
        setShowAnimation('win');
      } else {
        setShowAnimation('lose');
      }
  
      setTimeout(() => {
        setShowAnimation(null);
      }, 1000);
  
    }, 1000);
  };
  
  const handleGoBack = () => {
    router.back()
  };

  // Rendu des cartes avec animation de gomme
  const renderItem = ({ item, index }) => {
    //const eraseProgress = useSharedValue(0);

    // useEffect(() => {
    //   if (revealed[index]) {
    //     eraseProgress.value = withTiming(1, { duration: 1000 });
    //   }
    // }, [revealed]);

    // const animatedStyle = useAnimatedStyle(() => ({
    //   transform: [{ translateY: (1 - eraseProgress.value) * 80 }],
    //   opacity: 1 - eraseProgress.value,
    // }));

    return (
      
      <TouchableOpacity onPress={() => handlePress(index, item)} style={styles.card}>
        {!revealed[index] ? (
          <Animated.View style={[styles.imageContainer]}>
            <Image source={image} style={styles.image} />
          </Animated.View>
        ) : (
          <Text style={styles.number}>{item}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={{}}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={{ flexDirection: "row", justifyContent: 'space-between', backgroundColor: Colors.primaryDark }}>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={handleGoBack}
              style={[styles.backbotton, { backgroundColor: Colors.gray + '30' }]}>
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <View>
              <Text style={[styles.header, { top: 8, }]}>{name}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 15, marginBottom: 4, color: COLORS.white }}> prix du jeux </Text>
                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4, backgroundColor: Colors.gray + 30, paddingLeft: 6, paddingRight: 6, color: "white" }}> ${(price / 5).toFixed(2)}</Text>
              </View>
            </View>

          </View>
          <View style={styles.winNumber}>
            <Ionicons name="star" size={48} color={Colors.yellow} />
            <Text style={styles.starText}>{WINNING_NUMBER}</Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
          {/* <Text>l'idee est de choisir au hasard une image un numero est cache derriere et cela pourais etre le numero gagant qui est affiche plus haut </Text> */}
          <FlatList
            data={shuffledNumbers}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={5} />

          {/* Affichage des animations de victoire/défaite */}
          {showAnimation && (
            <View style={styles.overlay}>
              <LottieView
                source={showAnimation === 'win'
                  ? require('../../assets/json/success.json')
                  : require('../../assets/json/629-empty-box.json')}
                autoPlay
                loop={false}
                style={styles.animation} />
              <Text style={styles.resultText}>
                {showAnimation === 'win' ? '🎉 Bravo ! Tu as gagné ! 🎉' : '😢 Dommage, réessaie !'}
              </Text>
            </View>
          )}
      </View>
    </>
  );
};

// Obtenir la largeur de l'écran pour ajuster la taille des cartes
const screenWidth = Dimensions.get('window').width;
const cardSize = screenWidth / 5 - 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white
  },
    content: {
      flexDirection: "row",
      marginTop: 40,
      marginHorizontal: 12
    },
    winNumber: {
      width: 48,
      height: 48,
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    starText: {
      position: 'absolute',
      fontSize: 22,
      fontWeight: 'bold',
      color: Colors.primaryDark,
    },
  card: {
    width: cardSize,
    height: cardSize,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  resultText: {
    fontSize: 24,
    color: '#fff',
    marginTop: 20,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.white
  },
  backbotton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'red',
  },
});

export default GridGame;
