import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, StatusBar } from "react-native";

export default function EffectScreen() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    setMensaje("El componente se montó y el temporizador comenzó");
    console.log("Componente montado - temporizador iniciado");

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      setMensaje("El componente se desmontó y el temporizador se detuvo");
      console.log("Componente desmontado - temporizador detenido");
    };
  }, []);

  useEffect(() => {
    if (count === 0) return;
    setMensaje(`El contador cambió a ${count}`);
    console.log(`El contador cambió a ${count}`);
  }, [count]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Ejemplo React Native con Hooks</Text>
      {mensaje ? (
        <Text style={[styles.label, { color: "blue", marginBottom: 15 }]}>
          {mensaje}
        </Text>
      ) : null}
      <View style={styles.section}>
        <Text style={styles.label}>Contador:</Text>
        <Text style={styles.value}>{count}</Text>
        <Button title="Incrementar" onPress={() => setCount(count + 1)} />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Temporizador (segundos):</Text>
        <Text style={styles.value}>{seconds}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 30,
    alignItems: "center",
    width: "80%",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  value: {
    fontSize: 32,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
