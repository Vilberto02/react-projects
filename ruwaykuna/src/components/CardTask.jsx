import { StyleSheet, Text, View } from "react-native";

export default function CardTask({ task }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleTask}>Listo</Text>
      <Text style={styles.titleTask}>{task.title}</Text>
      <Text style={styles.titleTask}>{task.priority}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleTask: {
    color: "#fff",
  },
});
