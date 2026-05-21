import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ClockSettingsContext } from './_layout';
import * as ScreenOrientation from 'expo-screen-orientation';
import { RotateCcw, Lock } from 'lucide-react-native';

export default function StopwatchScreen() {
  const { showUI, setShowUI } = useContext(ClockSettingsContext);

  const handleRotate = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    if (
      orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    ) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }
  };

  const toggleUI = () => setShowUI(!showUI);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>CRONÓMETRO</Text>
        <Text style={styles.subtitle}>Inicia tu cronómetro aquí</Text>
      </View>

      <Pressable style={styles.floatingButtonLeft} onPress={(e) => { e.stopPropagation(); handleRotate(); }}>
        <RotateCcw color="#ffffff" size={24} />
      </Pressable>
      <Pressable style={styles.floatingButtonRight} onPress={(e) => { e.stopPropagation(); toggleUI(); }}>
        <Lock color="#ffffff" size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
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
  floatingButtonLeft: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  floatingButtonRight: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },
});
