import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

const Create = () => {
  const { name, service, date, time, duration } = useLocalSearchParams();

  return (
    <View style={styles.contenaire}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Détails de la réservation</Text>
      <Text>Nom : {name}</Text>
      <Text>Service : {service}</Text>
      <Text>Date : {date}</Text>
      <Text>Heure : {time}</Text>
      <Text>Durée : {duration}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenaire: {
    marginTop: 50,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Create;
