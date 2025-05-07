import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const SuperficieInput = () => {
  const [surfaceInput, setSurfaceInput] = useState('');
  const [estimation, setEstimation] = useState('');

  const estimatePrice = (surface) => {
    if (surface === 0) return '';

    if (surface < 1000) return '150–200 $';
    if (surface < 2000) return '200–350 $';
    if (surface < 5000) return '350–600 $';

    // Pour plus de 5000, "sur devis"
    const min = Math.floor(surface * 0.15);
    const max = Math.floor(surface * 0.30);
    return `${min}–${max} $`;
  };

  const handleChange = (text) => {
    // Extraire seulement les chiffres
    const numeric = text.replace(/\D/g, '');
    setSurfaceInput(numeric);

    const surfaceValue = parseInt(numeric, 10) || 0;
    const estimatedPrice = estimatePrice(surfaceValue);
    setEstimation(estimatedPrice);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Superficie en pieds carrés (pi²) :</Text>
     <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
        <TextInput
            style={styles.input}
            value={surfaceInput}
            onChangeText={handleChange}
            keyboardType="numeric"
            placeholder="Exemple : 1200"
        />
        {surfaceInput ? (
            <Text style={styles.result}>
            👉 {estimation}
            </Text>
        ) : null}
     </View>
      <Text style={styles.note}>💡 Estimation basée sur : 0.15–0.30 $/pi²</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 1 },
  label: { fontSize: 16, marginBottom: 8, marginTop: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    width: "64%"
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  note: { marginTop: 8, fontSize: 13, color: '#555' },
});

export default SuperficieInput;
