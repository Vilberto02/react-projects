import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProbabilityChart({ probs }) {
  const colors = [
    '#E74C3C', '#F39C12',
    '#27AE60', '#3498DB'
  ];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Probabilidades por Clase
      </Text>
      {probs.map((item, index) => (
        <View key={item.name} style={styles.barRow}>
          <Text style={styles.label}>
            {item.name}
          </Text>
          <View style={styles.barBg}>
            <View style={[
              styles.barFill,
              {
                width: `${item.value * 100}%`,
                backgroundColor: colors[index % colors.length],
              },
            ]} />
          </View>
          <Text style={styles.percent}>
            {item.percentage}%
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    width: 90,
    fontSize: 13,
    color: '#555',
  },
  barBg: {
    flex: 1,
    height: 20,
    backgroundColor: '#EEE',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 10,
  },
  percent: {
    width: 50,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
});
