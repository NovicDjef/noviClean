import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import Colors from '../../constants/Colors';
import { Stack } from 'expo-router';
import { WebView } from 'react-native-webview';

// Génération de numéros mélangés aléatoirement
const generateShuffledNumbers = () => {
  const numbers = Array.from({ length: 40 }, (_, i) => i);
  return numbers.sort(() => Math.random() - 0.5);
};

// Définition du numéro gagnant
const WINNING_NUMBER = Math.floor(Math.random() * 40);

const GridGame = () => {
  const { id, name, price, image } = useLocalSearchParams();
  const [revealed, setRevealed] = useState({});
  const [showWheel, setShowWheel] = useState(false);
  const [wheelResult, setWheelResult] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const shuffledNumbers = generateShuffledNumbers();
  const router = useRouter();
  const webViewRef = useRef(null);
  const lottieRef = useRef(null);


    // HTML pour la roue de récompense
    const generateWheelHTML = (selectedNumber) => {
      // Générer des numéros aléatoires pour les autres sections (différents du numéro sélectionné)
      const generateRandomNumber = () => {
        const num = Math.floor(Math.random() * 40);
        return num === selectedNumber ? (num + 1) % 40 : num;
      };

  const section1 = selectedNumber; // Section gagnante
  const section2 = generateRandomNumber();
  const section3 = generateRandomNumber();
  const section4 = generateRandomNumber();
  
  // HTML pour la roue de récompense
  return `
    <!DOCTYPE html>
       <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: transparent;
          overflow: hidden;
          font-family: Arial, sans-serif;
        }
        
        .wheel-container {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .wheel {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          transition: transform 3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
          transform: rotate(0deg);
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        
        .section {
          position: absolute;
          width: 50%;
          height: 50%;
          transform-origin: bottom right;
          left: 0;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        
        .section-content {
          position: absolute;
          left: 35px;
          top: 40px;
          transform: rotate(45deg);
          width: 70px;
          text-align: center;
          font-weight: bold;
          color: #330000;
          font-size: 24px;
        }
        
        .section-image {
          position: absolute;
          left: 30px;
          top: 25px;
          transform: rotate(45deg);
          width: 60px;
          height: 60px;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .center-circle {
          position: absolute;
          width: 50px;
          height: 50px;
          background: #222;
          border-radius: 50%;
          z-index: 10;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 0 5px rgba(0,0,0,0.5);
        }
        
        .stop-button {
          position: absolute;
          width: 100px;
          height: 40px;
          bottom: -70px;
          background: #FF7A30;
          color: white;
          border: none;
          border-radius: 20px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .pin {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
          background: #FFF;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg) translateX(-50%);
          box-shadow: 0 0 5px rgba(0,0,0,0.3);
          z-index: 11;
        }
        
        .result-text {
          position: absolute;
          top: -50px;
          font-size: 24px;
          font-weight: bold;
          color: white;
          text-align: center;
          text-shadow: 0 0 5px rgba(0,0,0,0.5);
        }
        
        .confetti {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
          display: none;
        }
      </style>
    </head>
    <body>
      <div class="wheel-container">
        <div class="result-text" id="result"></div>
        <div class="pin"></div>
        <div class="wheel" id="wheel">
          <div class="section" style="transform: rotate(0deg); background: #FFEFD5;">
            <div class="section-image" style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 100 100\\"><path d=\\"M30,20 L70,20 L80,50 L70,80 L30,80 L20,50 Z\\" stroke=\\"black\\" fill=\\"none\\"/><path d=\\"M30,50 L70,50\\" stroke=\\"black\\" stroke-width=\\"2\\"/><path d=\\"M40,20 L40,50\\" stroke=\\"black\\" stroke-width=\\"2\\"/><path d=\\"M60,20 L60,50\\" stroke=\\"black\\" stroke-width=\\"2\\"/><path d=\\"M30,80 C30,65 70,65 70,80\\" stroke=\\"black\\" stroke-width=\\"2\\" fill=\\"none\\"/></svg>');"></div>
            <div class="section-content">${section1}</div>
          </div>
          <div class="section" style="transform: rotate(90deg); background: #FFCF9E;">
            <div class="section-content">${section2}</div>
          </div>
          <div class="section" style="transform: rotate(180deg); background: #FFEFD5;">
            <div class="section-content">${section3}</div>
          </div>
          <div class="section" style="transform: rotate(270deg); background: #2759ff;">
            <div class="section-content">${section4}</div>
          </div>
        </div>
        <div class="center-circle"></div>
        <button class="stop-button" id="stopBtn">ARRÊTER</button>
      </div>
      
      <!-- Conteneur pour l'animation de confettis -->
      <div id="confetti" class="confetti"></div>

      <script>
        // Paramètres du numéro sélectionné et de la section gagnante
        const selectedNumber = ${selectedNumber};
        const winningDegree = 45; // Centre de la première section (0-90 degrés)
        
        let spinning = false;
        let rotationAngle = 0;
        let spinInterval;
        let speed = 20; // Vitesse initiale plus rapide
        const wheel = document.getElementById('wheel');
        const resultText = document.getElementById('result');
        const stopBtn = document.getElementById('stopBtn');
        const confetti = document.getElementById('confetti');
        
        // Fonction pour afficher les confettis
        function showConfetti() {
          confetti.style.display = 'block';
          confetti.innerHTML = '';
          
          // Créer les confettis
          for (let i = 0; i < 100; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.style.position = 'absolute';
            confettiPiece.style.width = Math.random() * 10 + 5 + 'px';
            confettiPiece.style.height = Math.random() * 10 + 5 + 'px';
            confettiPiece.style.backgroundColor = ['#2759ff', '#FFEFD5', '#FFCF9E', '#637aff99', '#FFC107'][Math.floor(Math.random() * 5)];
            confettiPiece.style.left = Math.random() * 100 + '%';
            confettiPiece.style.top = Math.random() * 100 + '%';
            confettiPiece.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
            confettiPiece.style.opacity = '0';
            confettiPiece.style.transition = 'transform 1s ease-out, opacity 1s ease-out, top 1s ease-out';
            
            confetti.appendChild(confettiPiece);
            
            setTimeout(() => {
              confettiPiece.style.opacity = '1';
              confettiPiece.style.top = (parseFloat(confettiPiece.style.top) + Math.random() * 50 - 25) + '%';
              confettiPiece.style.transform = 'rotate(' + (Math.random() * 360 + 360) + 'deg)';
              
              setTimeout(() => {
                confettiPiece.style.opacity = '0';
              }, 800);
            }, Math.random() * 500);
          }
          
          setTimeout(() => {
            confetti.style.display = 'none';
          }, 2000);
        }
        
        // Commencer à tourner automatiquement avec vitesse variable
        function startSpin() {
          if (!spinning) {
            spinning = true;
            spinInterval = setInterval(() => {
              // Augmenter progressivement la vitesse
              if (speed < 30) {
                speed += 0.2;
              }
              rotationAngle += speed;
              wheel.style.transform = 'rotate(' + rotationAngle + 'deg)';
            }, 30); // Intervalle plus court pour une animation plus fluide
          }
        }
        
        // Calculer l'angle final pour que la roue s'arrête sur le numéro sélectionné
        function calculateTargetAngle() {
          // Calculer combien de rotations complètes
          const fullRotations = 5 + Math.floor(Math.random() * 3); // 5-7 rotations complètes
          
          // Calculer l'angle requis pour que la section 1 (0-90 degrés) soit en haut
          // Nous voulons que l'indicateur pointe vers le winningDegree
          const baseAngle = 360 * fullRotations;
          
          // L'indicateur est en haut, donc nous devons ajuster pour que la section gagnante soit en haut
          // Cela signifie que la section 1 doit être en bas, ce qui nécessite une rotation de 180 degrés
          // puis un ajustement supplémentaire pour centrer la section
          return baseAngle + (360 - winningDegree);
        }
        
        // Arrêter la roue avec un effet de ralentissement
        function stopSpin() {
          if (spinning) {
            clearInterval(spinInterval);
            
            // Calculer l'angle cible
            const targetAngle = calculateTargetAngle();
            const currentAngle = rotationAngle % 360;
            const angleDifference = targetAngle - currentAngle;
            
            let progress = 0;
            const duration = 3000; // 3 secondes
            const interval = 20; // 20ms par frame
            const frames = duration / interval;
            
            // Animation fluide vers l'angle cible
            const smoothStopInterval = setInterval(() => {
              progress += 1 / frames;
              if (progress >= 1) {
                clearInterval(smoothStopInterval);
                rotationAngle = targetAngle;
                wheel.style.transform = 'rotate(' + rotationAngle + 'deg)';
                spinning = false;
                finalizeSpin();
                return;
              }
              
              // Easing function pour un ralentissement progressif
              const easeOut = function(t) { return 1 - Math.pow(1 - t, 3); };
              
              // Calculer le nouvel angle avec easing
              const newAngle = currentAngle + (angleDifference * easeOut(progress));
              rotationAngle = newAngle;
              wheel.style.transform = 'rotate(' + rotationAngle + 'deg)';
            }, interval);
          }
        }
        
        // Finaliser le résultat
        function finalizeSpin() {
          // Le résultat est toujours le numéro sélectionné
          resultText.textContent = '🎉 ' + selectedNumber + ' 🎉';
          
          // Afficher les confettis
          showConfetti();
          
          // Envoyer le résultat à React Native
          window.ReactNativeWebView.postMessage('win:' + selectedNumber);
        }
        
        // Écouteur d'événement pour le bouton
        stopBtn.addEventListener('click', stopSpin);
        
        // Démarrer la roue automatiquement
        window.onload = function() {
          setTimeout(startSpin, 500);
        };
      </script>
    </body>
    </html>
  `
    };
  // Fonction pour gérer le clic sur une carte
  const handlePress = (index, number) => {
    if (revealed[index]) return;
  
    setRevealed((prev) => ({ ...prev, [index]: true }));
  
    // Stocker le numéro sélectionné pour la roue
    setSelectedNumber(number);

    setTimeout(() => {
      // Définir le résultat du jeu pour un traitement potentiel ultérieur
      if (number === WINNING_NUMBER) {
        setGameResult('win');
      } else {
        setGameResult('lose');
      }
      
      // Afficher la roue quelle que soit la situation (win ou lose)
      setShowWheel(true);
    }, 1000);
  };
  
  const handleGoBack = () => {
    router.back();
  };

  // Gérer les messages de la WebView (résultats de la roue)
  // const handleWebViewMessage = (event) => {
  //   const result = event.nativeEvent.data;
  //   setWheelResult(result);
    
  //   // Afficher le résultat avec contexte win/lose
  //   let finalResult = result;
  //   if (gameResult === 'win') {
  //     finalResult = '🎉 ' + result + ' 🎉';
  //   } else if (gameResult === 'lose') {
  //     // On affiche quand même le résultat même en cas de défaite
  //     finalResult = result + ' (Essayez encore!)';
  //   }
  //   setWheelResult(finalResult);
    
  //   // Fermer la roue après 3 secondes
  //   setTimeout(() => {
  //     setShowWheel(false);
  //     setWheelResult(null);
  //     setGameResult(null);
  //   }, 3000);
  // };

  // Gérer les messages de la WebView (résultats de la roue)
  const handleWebViewMessage = (event) => {
    const result = event.nativeEvent.data;
    
    // Format du message: "win:X" où X est le numéro
    if (result.startsWith('win:')) {
      const winningNumber = result.split(':')[1];
      setWheelResult(winningNumber);
      
      // Afficher l'animation de victoire
      setShowWinAnimation(true);
      
      // Fermer la roue après 4 secondes pour laisser l'animation se jouer
      setTimeout(() => {
        setShowWheel(false);
        
        // Laisser l'animation de victoire se terminer avant de la cacher
        setTimeout(() => {
          setShowWinAnimation(false);
          setWheelResult(null);
          setGameResult(null);
        }, 2000);
      }, 4000);
    }
  };


  // Rendu des cartes
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(index, item)} style={styles.card}>
        {!revealed[index] ? (
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>
        ) : (
          <Text style={styles.number}>{item}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View>
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
                <Text style={{ fontSize: 15, marginBottom: 4, color: COLORS.white }}> prix du jeu </Text>
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
        <FlatList
          data={shuffledNumbers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5} />

        {/* Suppression de l'overlay de défaite puisque nous affichons la roue dans tous les cas */}

        {/* Modal pour la roue de récompense */}
        <Modal
          visible={showWheel}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.wheelOverlay}>
            <View style={styles.wheelContainer}>
              <WebView
                ref={webViewRef}
                source={{ html: generateWheelHTML(selectedNumber) }}
                style={styles.webview}
                onMessage={handleWebViewMessage}
                javaScriptEnabled={true}
                originWhitelist={['*']}
              />
              {wheelResult && (
                <Text style={styles.wheelResultText}>
                  Vous avez gagné: {wheelResult}
                </Text>
              )}
            </View>
          </View>
        </Modal>
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
  wheelOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelContainer: {
    width: 380,
    height: 450,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    width: 320,
    height: 320,
    backgroundColor: 'transparent',
  },
  wheelResultText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  }
});

export default GridGame;