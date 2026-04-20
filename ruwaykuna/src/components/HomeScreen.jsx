import { ScrollView, StyleSheet, Text, View } from "react-native";
import CardTask from "./CardTask";

export default function HomeScreen() {
  const name = "Alberto";
  const tasks = [
    {
      id: 1,
      title: "Lavar ropa",
      description: "Descripcion de la tarea",
      date: "20/04/2026",
      hour: "10:00",
      priority: "2",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Lavar ropa",
      description: "Descripcion de la tarea",
      date: "20/04/2026",
      hour: "10:00",
      priority: "2",
      isCompleted: false,
    },
  ];
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.textTitle}>Hola, {name}</Text>
      <View style={styles.containerTasks}>
        <View style={styles.containerResumen}>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
            Hoy
          </Text>
          <Text style={{ color: "#fff" }}>{tasks.length} Tareas</Text>
        </View>
        <View style={styles.containerListTasks}>
          {tasks.map((task) => (
            <CardTask key={task.id} task={task}></CardTask>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
  },
  containerTasks: {
    marginTop: 28,
  },
  containerResumen: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerListTasks: {
    marginTop: 24,
    flexDirection: "column",
    gap: 20,
  },
});
