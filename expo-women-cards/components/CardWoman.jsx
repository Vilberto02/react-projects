import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
export default function CardWoman({ woman }) {
  return (
    <View style={styles.womanCardContainer}>
      <LinearGradient
        colors={[
          "rgba(185,28,89,.8)",
          "rgba(194,149,214,.7)",
          "rgba(147,123,191,.6)",
        ]}
        style={styles.background}
      />
      <Text style={styles.titleText}>
        {woman.name} {woman.lastName}
      </Text>
      <Image
        source={{ uri: woman.photo }}
        style={{ width: 200, height: 200, borderRadius: 10 }}
      />
      <Text>{woman.nationality}</Text>
      <Text style={styles.contentText}>{woman.bio}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  womanCardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 500,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 20,
  },
  contentText: {
    marginTop: 10,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 490,
    borderRadius: 20,
  },
});
