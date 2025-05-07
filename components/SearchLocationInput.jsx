import { COLORS } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchLocationInput = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <GooglePlacesAutocomplete
          placeholder="Rechercher un lieu"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log('Adresse sélectionnée:', details?.formatted_address);
            console.log('Coordonnées:', details?.geometry?.location);
          }}
          query={{
            key: 'AIzaSyAme0ZMQjUynvo6AeSVlMRzUPdcOSuPbZE',
            language: 'fr',
            types: 'address',
            components: 'country:ca',
          }}
          styles={{
            textInput: styles.textInput,
          }}
          enablePoweredByContainer={false}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <Ionicons
          name="locate"
          size={22}
          color={COLORS.red}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    marginTop: 12
  },
  inputWrapper: {
    position: 'relative',
  },
  textInput: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingRight: 40,
    backgroundColor: '#f0f0f0',
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 10,
    zIndex: 1,
  },
});

export default SearchLocationInput;
