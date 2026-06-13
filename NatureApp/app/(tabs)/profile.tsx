import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useProfile } from '../../src/viewmodels/useProfile';

export default function ProfileScreen() {
  const { name, email, darkTheme, notifications, toggleTheme, toggleNotifications } = useProfile();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{name || 'Usuario Demo'}</Text>
        
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email || 'demo@naturapp.com'}</Text>
      </View>

      <View style={styles.settingsGroup}>
        <Text style={styles.sectionTitle}>Preferencias</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Modo Oscuro</Text>
          <Switch value={darkTheme} onValueChange={toggleTheme} />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Notificaciones</Text>
          <Switch value={notifications} onValueChange={toggleNotifications} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1A5276', marginBottom: 16 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 8, elevation: 2, marginBottom: 24 },
  label: { color: '#666', fontSize: 14 },
  value: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  settingsGroup: { backgroundColor: '#FFF', padding: 16, borderRadius: 8, elevation: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A5276', marginBottom: 16 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  settingText: { fontSize: 16, color: '#333' }
});
