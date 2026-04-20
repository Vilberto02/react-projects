import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CardTask({ task }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
        <FontAwesome name="square-o" size={24} color="#EADDFF" />
        <View>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
            {task.title}
          </Text>
          <Text style={{ color: "#EADDFF", fontSize: 16 }}>
            {task.description}
          </Text>
        </View>
      </View>
      <Text style={{ color: "#EADDFF", fontSize: 16 }}>{task.hour}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2D2938",
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 14,
  },
  titleTask: {
    color: "#fff",
  },
});
