import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import MainContent from './src/components/MainContent';
import { SQLiteProvider } from 'expo-sqlite';
import { initDB } from './src/database/initDB';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <SQLiteProvider databaseName='tasks.db' onInit={initDB}>
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MainContent />
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </PaperProvider>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
