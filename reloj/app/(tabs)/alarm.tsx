import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AlarmScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ALARMA</Text>
      <Text style={styles.subtitle}>Configura tus alarmas aquí</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#ffffff',
    fontFamily: 'BricolageGrotesque_600SemiBold',
    fontSize: 30,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  subtitle: {
    color: '#767d88',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
});
