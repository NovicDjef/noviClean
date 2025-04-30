import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { fetchNotificationsData } from '@/redux/notificationSlice';

const Notifications = () => {
  // const notifications = useSelector(state => state.notification.data);
  const dispatch = useDispatch();

  const [storedNotifications, setStoredNotifications] = useState([]);

  // useEffect(() => {
  //   dispatch(fetchNotificationsData());
  // }, [dispatch]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const storedData = await AsyncStorage.getItem('notifications');
      if (storedData) {
        setStoredNotifications(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error);
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Image source={require('../../assets/images/cv.png')} style={{ width: 60, height: 70 }} />
     <View>
     <Text numberOfLines={1} style={styles.notificationTitle}>{item.name}</Text>
      <Text numberOfLines={3}>{item.description}</Text>
      <Text>{new Date(item.createdAt).toLocaleString()}</Text>
     </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <TouchableOpacity
          style={{ backgroundColor: COLORS.primary + 80, width: 40, height: 40, borderRadius: 25, justifyContent: 'center' }}
          onPress={() => router.back()}>
          <Ionicons name='arrow-back' style={{ textAlign: 'center' }} size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', bottom: 30, textAlign: 'center' }}>
          Liste Des Notifications
        </Text>
      </View>

      {notifications && notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotificationItem}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="notifications-outline" size={50} color={COLORS.primary} />
          <Text style={styles.emptyText}>Vous n'avez pas encore de notifications.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    //...FONTS.body3,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Notifications;
