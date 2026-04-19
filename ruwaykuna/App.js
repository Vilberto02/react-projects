import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-web";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>
        Open up App.js to start working on your app!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    padding: 50,
  },
});
