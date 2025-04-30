import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import { useTheme } from '../../themes/ThemeProvider';
import PaymentBottomSheet from '../../components/PaymentBottomSheet';
import { Stack } from 'expo-router';


const loadConversations = async () => {
  try {
    const storedConversations = await AsyncStorage.getItem('conversations');
    if (storedConversations) {
      const conversations = JSON.parse(storedConversations);
      return {
        conversationCount: conversations.length,
        messageCount: conversations.reduce((total, conv) => total + conv.messages.length, 0),
      };
    }
  } catch (error) {
    console.error('Error loading conversations:', error);
  }
  return { conversationCount: 0, messageCount: 0 };
};

const Profile = () => {
  const navigation = useNavigation();
  const [conversationCount, setConversationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const { dark, colors, setScheme } = useTheme();

  const ToggleTheme = ()=>{
      dark ? setScheme('light') : setScheme('dark')
  }
  useEffect(() => {
    const fetchData = async () => {
      const { conversationCount, messageCount } = await loadConversations();
      setConversationCount(conversationCount);
      setMessageCount(messageCount);
    };

    fetchData();
  }, []);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <>
    <Stack.Screen
      options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background, }]}>
        
        <View style={styles.profileSection}>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.profileImage} />
          <Text style={[styles.username, { color: colors.text }]}>Novic Tonleu</Text>
          <Text style={[styles.joinDate, { color: colors.text }]}>Frontend Developer</Text>
          <View style={[styles.statsContainer]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>{conversationCount}</Text>
              <Text style={[styles.statLabel, { color: colors.text }]}>Total Conversation</Text>
            </View>
            {/* <View style={styles.statItem}>
              <Text style={styles.statValue}>2.102</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View> */}
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>{messageCount}</Text>
              <Text style={[styles.statLabel, { color: colors.text }]}>Total Messages</Text>
            </View>
          </View>
        </View>

        <View style={[styles.menuSection, { backgroundColor: colors.background }]}>
          <TouchableOpacity style={styles.menuItem}
            onPress={() => setIsPaymentVisible(true)}
          >
          <View style={styles.menuIconContainer}>
            <Ionicons name="card-outline" size={24} color="#000" />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Payment</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Favorites</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="settings-outline" size={24} color="#000" />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Settings</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="language" size={24} color="#000" />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Language</Text>
          <Text style={styles.languageValue}>English</Text>
        </View>

        <View style={styles.menuItem}>
        <View style={styles.menuIconContainer}>
          <Ionicons 
            name="moon"
            size={24} 
            color="#000"
          />
        </View>
        <Text style={[styles.menuText, { color: colors.text }]}>Dark Mode</Text>
        <Switch 
          value={dark} 
          onValueChange={ToggleTheme}
          trackColor={{ false: "#767577", true: "#fffAAA" }}
        />
      </View>
      </View>
      <TouchableOpacity style={{
        alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding * 2,
    borderRadius: 12,
    marginHorizontal: 22,
    marginTop: 22
  }}>
          <Text style={[styles.logoutText, { color: "white" }]}>Log out</Text>
        </TouchableOpacity>
        <PaymentBottomSheet
          isVisible={isPaymentVisible}
          onClose={() => setIsPaymentVisible(false)} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F5',
    padding: 20,
    //marginTop: 36
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#20B2AA',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  joinDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
  },
  menuSection: {
    borderRadius: 20,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0FFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
  languageValue: {
    fontSize: 16,
    color: '#888',
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    width: 300,
    paddingVertical: SIZES.padding * 2,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
