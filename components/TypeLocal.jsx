import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const estimatedHours = ['Bureau', 'Magasin', 'Restaurant', 'Clinique / Santé', "Entrepôt", "Autre"];

const TypeLocal = () => {
  const [selected, setSelected] = useState('');
  const [visible, setVisible] = useState(false);

  const selectItem = (item) => {
    setSelected(item);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type de local</Text>

      <TouchableOpacity style={styles.dropdown} onPress={() => setVisible(true)}>
        <Text style={{ color: selected ? '#000' : '#999' }}>
          {selected || 'Type de local'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.dropdownList}>
            <FlatList
              data={estimatedHours}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => selectItem(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default TypeLocal;

const styles = StyleSheet.create({
  container: {
    // margin: 20,
  },
  label: {
    marginBottom: 6,
    fontWeight: '500',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
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


