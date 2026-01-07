import { CustomButton } from "@/components/custom-button";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Colors = {
  light: {
    text: "#000",
    border: "#525252",
    buttonGhost: "#ffffff50",
    placeholder: "#A6A09B",
  },
  dark: {
    text: "#fff",
    border: "#9F9FA9",
    buttonGhost: "#ffffff30",
    placeholder: "#FAFAF9",
  },
};

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  
  const theme = Colors[colorScheme];

  const styles = StyleSheet.create({
    textInput: {
      borderWidth: 1,
      borderRadius: 8,
      height: 136,
      padding: 8,
      textAlignVertical: "top",
      borderColor: `${theme.border}`,
      color: "#fff",
      fontSize: 16,
    },
    containerComponent: {
      gap: 12,
    },
    button: {
      backgroundColor: "#2AA63E",
      paddingVertical: 12,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8
    },
    footerContainer: {

    }
  });
  
  return (
    <View style={{ justifyContent: "space-between", height: "100%" }}>
      <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
        <View style={styles.containerComponent}>
          <Text style={{ color: theme.text, fontWeight: 700, fontSize: 20 }}>
            Texto
          </Text>
          <TextInput
            placeholder="Ingresa tu texto aquí"
            placeholderTextColor={`${theme.placeholder}`}
            style={styles.textInput}
          ></TextInput>
          <View style={{ gap: 8 }}>
            <TouchableOpacity style={styles.button}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 600,
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Mejorar texto
              </Text>
            </TouchableOpacity>
            <CustomButton title="Limpiar" variant="secondary"></CustomButton>
          </View>
        </View>
        <View style={styles.containerComponent}>
          <Text
            style={{
              marginTop: 8,
              color: theme.text,
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            Resultado
          </Text>
          <TextInput
            placeholder="Aquí se mostrará el texto mejorado."
            placeholderTextColor={`${theme.placeholder}`}
            style={styles.textInput}
          ></TextInput>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: "auto",
          paddingVertical: 16,
          backgroundColor: "#171717",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 0,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontWeight: 500,
            fontSize: 16,
          }}
        >
          Mejorador de texto
        </Text>
      </View>
    </View>
  );
}


