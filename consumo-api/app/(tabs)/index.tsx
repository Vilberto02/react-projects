import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import data from "@/constants/women.json";
import { Image, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="oven.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Mujeres importantes
        </ThemedText>
      </ThemedView>
      {data.map((item) => (
        <ThemedView key={item.id} style={styles.card}>
          <ThemedView style={styles.cardPhoto}>
            <Image
              source={{ uri: `${item.photo}` }}
              style={{ width: "100%", height: "100%", objectFit: "fill" }}
            />
          </ThemedView>
          <ThemedView style={styles.cardContent}>
            <ThemedText>
              <b>Nombre:</b> {item.name}
            </ThemedText>
            <ThemedText>
              <b>Apellido:</b> {item.lastName}
            </ThemedText>
            <ThemedText>
              <b>Nacionalidad:</b> {item.nationality}
            </ThemedText>
            <ThemedText>
              <b>Biografía:</b> {item.bio}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 24,
  },
  containerText: {
    textAlign: "center",
  },
  scrollView: {
    marginTop: 24,
    width: "100%",
    height: 648,
  },
  containerItems: {
    flexDirection: "column",
    gap: 8,
    paddingRight: 8,
  },
  card: {
    flexDirection: "row",
    gap: 8,
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 8,
    padding: 8,
  },
  cardPhoto: {
    width: 148,
    aspectRatio: 1 / 1,
  },
  cardContent: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
  },
});

/*

<ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.containerText}>
        Ejemplo - JSON
      </ThemedText>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerItems}>
          {data.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardPhoto}>
                <Image
                  source={{ uri: `${item.photo}` }}
                  style={{ width: "100%", height: "100%", objectFit: "fill" }}
                />
              </View>
              <View style={styles.cardContent}>
                <ThemedText>
                  <b>Nombre:</b> {item.name}
                </ThemedText>
                <ThemedText>
                  <b>Apellido:</b> {item.lastName}
                </ThemedText>
                <ThemedText>
                  <b>Nacionalidad:</b> {item.nationality}
                </ThemedText>
                <ThemedText>
                  <b>Biografía:</b> {item.bio}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>

*/
