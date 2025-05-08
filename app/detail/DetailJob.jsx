import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, Platform, ScrollView } from 'react-native'
import React, {useRef, useState} from 'react'
import { Stack, useLocalSearchParams, Link, router } from 'expo-router'
import
     Animated, {
    withTiming,
    withDelay,
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    Extrapolate,
    runOnJS,
  } from 'react-native-reanimated';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
// import { SharedElement } from 'react-navigation-shared-element';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Section from "../../components/Section"


type Props = {}
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HEADER_HEIGHT = Platform.OS === 'ios' ? 260 : 210;
const DetailJob = (props: Props) => {
    const { id, name, image } = useLocalSearchParams();
    const [selectedTab, setSelectedTab] = useState('description');
    const scrollY = useSharedValue(0);
    const headerShareValue = useSharedValue(80);
    const opacity = useSharedValue(0);
    // const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      };
    });

    const services = [
      { id: '1', name: 'Nettoyage cuisine', icon: 'restaurant' },
      { id: '2', name: 'Nettoyage salle de bain', icon: 'water' },
      { id: '3', name: 'Aspiration sol', icon: 'home' },
      { id: '4', name: 'Dépoussiérage', icon: 'leaf' },
      { id: '1', name: 'Nettoyage des fenêtres', icon: 'restaurant' },
      { id: '2', name: 'Repassage / buanderie', icon: 'water' },
      { id: '3', name: 'Nettoyage du frigo / four', icon: 'home' },
      { id: '4', name: 'Aspirateur canapé / tapis', icon: 'leaf' },
    ];

    const renderContent = () => {
      if (selectedTab === 'description') {
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.descriptionText}>
              Nos services de nettoyage à domicile assurent un environnement propre, sain et confortable. Nos professionnels sont qualifiés et disponibles selon vos besoins.
            </Text>
          </View>
        );
      } else if (selectedTab === 'services') {
        return (
          <View style={styles.servicesContainer}>
            {services.map(service => (
              <View key={service.id} style={styles.serviceItem}>
                <Ionicons name={service.icon} size={24} color="#4CAF50" style={{ marginRight: 10 }} />
                <Text style={styles.serviceText}>{service.name}</Text>
              </View>
            ))}
          </View>
        );
      }
    };
  
    const menuTabs = [
      { id: 'description', label: 'Description' },
      { id: 'services', label: 'Services offerts' },
    ];
  


      function BackHandler() {
        router.back();
      }

  
      function renderHeader() {
          const inputRange =  [0, HEADER_HEIGHT -40]
          headerShareValue.value = withDelay(500, 
            withTiming(0, {
              duration: 500
            })
          )
    
      
    
            const headerHieghtAnimatedStyle = useAnimatedStyle(() => {
              return {
                height: interpolate(scrollY.value, inputRange,
                [HEADER_HEIGHT, 140], Extrapolate.CLAMP)
              }
            })
          
            const headerHideOnscrollAnimationStyle = useAnimatedStyle(() => {
              return {
                opacity : interpolate(scrollY.value, [80, 0],
                [0, 1], Extrapolate.CLAMP),
                transform: [
                  {
                    translateY: interpolate(scrollY.value,
                    inputRange, [0, 200], Extrapolate.CLAMP)
                  }
                ]
              }
            })
    
            const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => {
              return {
                opacity: interpolate(scrollY.value, [80, 0],
                [1, 0], Extrapolate.CLAMP), 
                transform: [
                  {
                    translateY: interpolate(scrollY.value,
                    inputRange, [50, 130], Extrapolate.CLAMP)
                  }
                ]
              }
            })
          
          return (
            <Animated.View
            style={[{
              position: 'relative',
              top: 0,
              left: 0,
              right: 0,
              height: 120,
              overflow: 'hidden',
            }, headerHieghtAnimatedStyle]}
            >

              <Image
              source={image}
              // source={require('../../assets/images/glacier.jpg')}
                resizeMode="cover"
                style={{
                  height: '100%',
                  width: '100%',
                  borderBottomLeftRadius: 60,
                }}
              />
      
              {/* titre */}
                <Animated.View style={[{
                  position: "absolute",
                  top: -70,
                  left: 0,
                  right: 0
                }, headerShowOnScrollAnimatedStyle]}>
                  <Text style={{
                    textAlign: "center",
                    color: COLORS.white,
                    ...FONTS.h1,
                    fontWeight: "bold"
                  }}>
                    {name}
                  </Text>
                  <View style={{display: "flex", justifyContent: "center", alignItems: "center", top: 16}}>
                  <View style={{ position: "absolute", marginTop: 100, marginLeft: 32, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <View style={{flexDirection: "column", margin: 2,}}>
                      <View style={{ flexDirection: 'row' }}>
                        {[...Array(5)].map((_, i) => (
                          <Ionicons 
                            key={i} 
                            name="star"
                            size={20} 
                            color={COLORS.yellow}
                            style={{ marginRight: 2 }} 
                          />
                        ))}
                      </View>
                        <Text style={{color: COLORS.white}}>5.0 Star ratings</Text>
                    </View>
                  </View>
                  </View>
                </Animated.View>
    
    
              <Animated.View
              style={[{
                position: 'absolute',
                bottom: 80,
                left: 30,
              }, headerHideOnscrollAnimationStyle]}
              >
                  <Text
                  style={{
                    position: 'absolute',
                    color: COLORS.white,
                    ...FONTS.h1,
                    fontWeight: "bold"
                  }}
                  >
                    {name}
                  </Text>
                              
              </Animated.View>
              <View style={{ position: "absolute", marginLeft: 32, top: 220, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View style={{flexDirection: "column", margin: 2,}}>
                      <View style={{ flexDirection: 'row' }}>
                      {[...Array(5)].map((_, i) => (
                          <Ionicons 
                            key={i} 
                            name="star"
                            size={20} 
                            color={COLORS.yellow} 
                            style={{ marginRight: 2 }} 
                          />
                        ))}
                      </View>
                        <Text style={{color: COLORS.white, top: 0}}>5.0 Star_ratings </Text>
                </View>
              </View>

              <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
      }}>
        {/* Premier élément aligné à gauche */}
        <Animated.View
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            backgroundColor: COLORS.primaryDark + 30,
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
        
        {/* Deuxième élément aligné à droite */}
        
        <Animated.View
        style={[
          styles.HeureContent,
          animatedStyle,
          { backgroundColor: COLORS.primary + '90'}
        ]}
      >
        <Text style={styles.textHeure}>
          Ouvert 
        </Text>
      </Animated.View>
    </View>
    

              
            </Animated.View>
            
          );
        }

      function renderMenu() {
        const categories = [
          { id: '1', name: 'cleaning company', price: 100, image: require("../../assets/images/1.avif") },
          { id: '2', name: 'Office Cleaning', price: 120, image: require("../../assets/images/2.jpg") },
          { id: '3', name: 'House cleaning', price: 90, image: require("../../assets/images/3.jpg") },
          { id: '4', name: 'kitchen cleaning', price: 80, image: require("../../assets/images/4.webp") },
          { id: '5', name: 'Reebok Club C', price: 110, image: require("../../assets/images/5.webp") },
          { id: '6', name: 'Converse All-Star', price: 95, image: require("../../assets/images/2.jpg") },
        ];
        return (
          <>
            <StatusBar style="light" />
           
            {/* <Section styless href={{ pathname: `/repas/PlatsList`}} label={t("Category_Available")}/> */}
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: -10 }}>
            
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View key={item.id} style={{ marginHorizontal: 10 }}>
                  <Image
                    source={item.image}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                    resizeMode="cover"
                  />
                </View>
              )}
            />

            </View>
          </>
        );
      }

      function renderServices() {
        return(
          <View style={styles.containerr}>
      <FlatList
        horizontal
        data={menuTabs}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.menuContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedTab(item.id)}
            style={[
              styles.menuButton,
              selectedTab === item.id && styles.menuButtonActive,
            ]}
          >
            <Text
              style={[
                styles.menuText,
                selectedTab === item.id && styles.menuTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.separator} />
      {renderContent()}
    </View>
        )
      }

     
  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        {/* header */}
        {renderHeader()}
        <Section styless  label="Galery"/>
          {/* Menus */}
        {renderMenu()}

           {/* result */}
        {renderServices()}

        <TouchableOpacity style={styles.booknow}
           onPress={() => router.push({
            pathname: "./Booking",
            params: {name}

           })}
           >
          <Text style={styles.booknowText}>
            Book Now
          </Text>
        </TouchableOpacity>
       
      </ScrollView>
    </>
    
  )
}

export default DetailJob
const styles = StyleSheet.create({
  container: {
    // position: 'aboluste',
    flexDirection: "row-reverse",
    width: 32,
    height: 32,
     top: -12,
    alignItems: 'center',
    //justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginTop: 18
    
  },
  mainbox: {
    position: 'relative',
    width: 220,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
    borderRadius: 160,
    backgroundColor: "#d7d7d79c",
    transitionDuration: 0.3,
    marginRight: 6
  },
  search_input: {
    height: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    paddingLeft: 20,
    fontSize: 16,
    color: COLORS.black,
    //fontFamily: 'System',
  },
  HeureContent: {
    padding: 8,
    borderRadius: SIZES.radius,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeure: {
    ...FONTS.h3,
    color: COLORS.white,
    textAlign: 'center',
  },


  containerr: {
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    //flex: 1,
  },
  menuContainer: {
    paddingBottom: 10,
  },
  menuButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  menuButtonActive: {
    backgroundColor: COLORS.primaryDark,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  menuTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  servicesContainer: {
    paddingVertical: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
  },
  booknow: {
    backgroundColor: COLORS.primaryDark,
    marginHorizontal: 20,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    
  },
  booknowText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold"
  }

});


