import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import data from "@/constants/women.json";
import { StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
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
          Lista de mujeres
        </ThemedText>
      </ThemedView>
      {data.map((item) => (
        <Collapsible key={item.id} title={`${item.name}`}>
          <ThemedView>
            <ThemedText>
              <b>Nombre:</b> {item.name}
            </ThemedText>
            <ThemedText>
              <b>Apellido:</b> {item.lastName}
            </ThemedText>
            <ThemedText>
              <b>Nacionalidad:</b> {item.nationality}
            </ThemedText>
          </ThemedView>
          <ThemedText>
            <b>Biografía:</b> {item.bio}
          </ThemedText>
        </Collapsible>
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
});
