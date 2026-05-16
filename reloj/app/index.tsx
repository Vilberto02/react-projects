import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Modal } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import {
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_700Bold,
} from '@expo-google-fonts/bricolage-grotesque';

export default function ClockScreen() {
  useKeepAwake(); // Keep the screen on

  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_700Bold,
  });

  const [time, setTime] = useState(new Date());
  const [showUI, setShowUI] = useState(true);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [clockScale, setClockScale] = useState(1);
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!fontsLoaded) {
    return <View style={styles.container} />; // Blank screen until fonts load
  }

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const months = [
      'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];
    return `${days[date.getDay()]} • ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const toggleUI = () => setShowUI(!showUI);

  // Responsive font sizes
  const baseTimeSize = isLandscape ? height * 0.45 : width * 0.35;
  const timeFontSize = baseTimeSize * clockScale;
  const headerFontSize = isLandscape ? height * 0.04 : width * 0.04;
  const dateFontSize = isLandscape ? height * 0.04 : width * 0.035;

  return (
    <>
      <Pressable style={styles.container} onPress={toggleUI}>
        {/* Header */}
        {showUI && (
          <View style={styles.header}>
            <Pressable onPress={(e) => { e.stopPropagation(); }}>
              <Ionicons name="menu" size={28} color="#ffffff" />
            </Pressable>
            <Text style={[styles.headerTitle, { fontSize: headerFontSize }]}>CHRONOS</Text>
            <Pressable onPress={(e) => { e.stopPropagation(); setSettingsVisible(true); }}>
              <Ionicons name="settings-outline" size={24} color="#ffffff" />
            </Pressable>
          </View>
        )}

        {/* Main Clock Area */}
        <View style={styles.clockContainer}>
          <Text style={[styles.timeText, { fontSize: timeFontSize }]}>{formatTime(time)}</Text>
          {showUI && (
            <Text style={[styles.dateText, { fontSize: dateFontSize }]}>{formatDate(time)}</Text>
          )}
        </View>

        {/* Footer Navigation */}
        {showUI && (
          <View style={styles.footer}>
            <Pressable style={styles.navItem} onPress={(e) => e.stopPropagation()}>
              <Ionicons name="alarm-outline" size={24} color="#ffffff" />
              <Text style={styles.navTextActive}>ALARM</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={(e) => e.stopPropagation()}>
              <Ionicons name="globe-outline" size={24} color="#767d88" />
              <Text style={styles.navText}>WORLD</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={(e) => e.stopPropagation()}>
              <Ionicons name="timer-outline" size={24} color="#767d88" />
              <Text style={styles.navText}>TIMER</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={(e) => e.stopPropagation()}>
              <Ionicons name="hourglass-outline" size={24} color="#767d88" />
              <Text style={styles.navText}>STOPWATCH</Text>
            </Pressable>
          </View>
        )}
      </Pressable>

      {/* Settings Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={settingsVisible}
        onRequestClose={() => setSettingsVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setSettingsVisible(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>SETTINGS</Text>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>CLOCK SIZE</Text>
              <View style={styles.controlsRow}>
                <Pressable 
                  style={styles.controlButton} 
                  onPress={() => setClockScale(Math.max(0.5, clockScale - 0.1))}
                >
                  <Ionicons name="remove" size={20} color="#ffffff" />
                </Pressable>
                <Text style={styles.scaleText}>{Math.round(clockScale * 100)}%</Text>
                <Pressable 
                  style={styles.controlButton} 
                  onPress={() => setClockScale(Math.min(2.0, clockScale + 0.1))}
                >
                  <Ionicons name="add" size={20} color="#ffffff" />
                </Pressable>
              </View>
            </View>

            <Pressable style={styles.closeButton} onPress={() => setSettingsVisible(false)}>
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60, // Safe area approx
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontFamily: 'BricolageGrotesque_600SemiBold',
    letterSpacing: -0.5, // display-md spacing
  },
  clockContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: '#ffffff',
    fontFamily: 'BricolageGrotesque_700Bold',
    fontVariant: ['tabular-nums'],
    lineHeight: undefined,
    includeFontPadding: false,
    letterSpacing: -3, // display-xxl spacing
  },
  dateText: {
    color: '#767d88', // Cool Slate
    fontFamily: 'Inter_600SemiBold', // basier-square equivalent
    letterSpacing: -0.35, // caption-tight spacing
    marginTop: 20,
    textTransform: 'uppercase',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    paddingBottom: 40, // Safe area approx
    borderTopWidth: 1,
    borderTopColor: '#27272a', // Border Dark
    backgroundColor: '#030303', // Deep Black
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    color: '#767d88',
    fontFamily: 'Inter_600SemiBold', // basier-square equivalent
    fontSize: 10,
    marginTop: 8,
    letterSpacing: 0,
  },
  navTextActive: {
    color: '#ffffff',
    fontFamily: 'Inter_600SemiBold', // basier-square equivalent
    fontSize: 10,
    marginTop: 8,
    letterSpacing: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a', // Dark Surface
    width: '80%',
    maxWidth: 400,
    borderRadius: 16, // Generous radius from DESIGN.md
    padding: 24,
    borderWidth: 1,
    borderColor: '#27272a', // Border Dark
  },
  modalTitle: {
    color: '#ffffff',
    fontFamily: 'BricolageGrotesque_600SemiBold',
    fontSize: 16,
    letterSpacing: -0.3,
    marginBottom: 24,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  settingLabel: {
    color: '#767d88',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    letterSpacing: -0.35,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  controlButton: {
    backgroundColor: '#27272a',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scaleText: {
    color: '#ffffff',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    minWidth: 48,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#27272a',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    letterSpacing: 0,
  },
});
