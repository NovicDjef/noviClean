import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../constants/theme';

const countries = [
  { code: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: '+1', name: 'USA', flag: '🇺🇸' },
  { code: '+237', name: 'Cameroun', flag: '🇨🇲' },
];

const PhoneInput = ({ value, onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Flag + code */}
      <TouchableOpacity
        style={styles.prefixContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.flag}>{selectedCountry.flag}</Text>
        <Text style={styles.code}>{selectedCountry.code}</Text>
         <Ionicons name="chevron-down" size={20} color={COLORS.primaryDark} style={{left: 8}} />
      </TouchableOpacity>

      {/* Phone input */}
      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        keyboardType="phone-pad"
        value={value}
        onChangeText={onChange}
        maxLength={15}
      />

      {/* Country modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code + item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => handleCountryChange(item)}
                >
                  <Text style={styles.countryText}>
                    {item.flag} {item.name} ({item.code})
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    alignItems: 'center',
    marginVertical: 2,
  },
  prefixContainer: {
    flex: 2,
    backgroundColor: COLORS.primaryDark +30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 18,
    marginRight: 4,
  },
  code: {
    fontWeight: 'bold',
    color: COLORS.primaryDark
  },
  input: {
    flex: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000044',
    justifyContent: 'center',
    padding: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  countryItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  countryText: {
    fontSize: 16,
  },
});
