import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
type VariantType =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

interface CustomButtonProps {
  title: string;
  variant?: VariantType;
  onPress?: () => void;
}

const baseStyles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

const VARIANTS: Record<VariantType, { container: ViewStyle; text: TextStyle }> =
  {
    primary: {
      container: { backgroundColor: "#2AA63E", borderWidth: 0 },
      text: { color: "#FFFFFF" },
    },
    secondary: {
      container: { backgroundColor: "#F4F4F5", borderWidth: 0 },
      text: { color: "#18181B" },
    },
    outline: {
      container: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#E4E4E7",
      },
      text: { color: "#18181B" },
    },
    ghost: {
      container: { backgroundColor: "transparent", borderWidth: 0 },
      text: { color: "#18181B" },
    },
    destructive: {
      container: { backgroundColor: "#EF4444", borderWidth: 0 },
      text: { color: "#FFFFFF" },
    },
    link: {
      container: { backgroundColor: "transparent", paddingHorizontal: 0 },
      text: { color: "#2AA63E", textDecorationLine: "underline" },
    },
  };

export const CustomButton = ({
  title,
  variant = "primary",
  onPress,
}: CustomButtonProps) => {
  const variantStyles = VARIANTS[variant] || VARIANTS.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        baseStyles.container,
        variantStyles.container,
      ]}
    >
      <Text
        style={[
          baseStyles.text,
          variantStyles.text,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
