import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/components/HomeScreen";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 90,
          right: 40,
          backgroundColor: "#D1BCFF",
          borderRadius: 16,
          padding: 12,
        }}
      >
        <Entypo name="plus" size={32} color="black" />
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0D13",
    paddingVertical: 120,
    paddingHorizontal: 30,
  },
});
