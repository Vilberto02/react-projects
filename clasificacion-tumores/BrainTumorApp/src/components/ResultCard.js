import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultCard({ result }) {
  const color = result.getColorForClass(
    result.predictedClass
  );
  
  return (
    <View style={[
      styles.card,
      { borderLeftColor: color }
    ]}>
      <Text style={[
        styles.prediction,
        { color }
      ]}>
        {result.prediction}
      </Text>
      <Text style={styles.description}>
        {result.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 5,
    elevation: 2,
  },
  prediction: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
