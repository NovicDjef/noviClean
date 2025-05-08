import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {COLORS} from "../constants/theme"

const logements = [
  { type: 'Studio (1½)', price: '50–55 $' },
  { type: '2½ à 3½', price: '55–70 $' },
  { type: '4½', price: '65–75 $' },
  { type: '5½', price: '70–85 $' },
  { type: '6½ ou plus', price: '85–100 $+' },
];

const TypeLogementAvecPrix = () => {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  const selectItem = (item) => {
    setSelected(item);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type de logement</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setVisible(true)}
        >
          <Text style={{ color: selected ? '#000' : '#999' }}>
            {selected?.type || 'Choisir...'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>

        <View style={styles.priceBox}>
          <Text style={styles.priceText}>
            {selected?.price || '--'}
          </Text>
        </View>
      </View>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.dropdownList}>
            <FlatList
              data={logements}
              keyExtractor={(item) => item.type}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => selectItem(item)}
                >
                  <Text>{item.type}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default TypeLogementAvecPrix;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 6,
    fontWeight: '500',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    marginRight: 8,
  },
  priceBox: {
    flex: 3,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: COLORS.primaryDark + 30,
    borderRadius: 6,
  },
  priceText: {
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000044',
    paddingHorizontal: 40,
  },
  dropdownList: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    elevation: 4,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
