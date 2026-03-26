import { Pressable, StyleSheet, Text } from "react-native";

interface TextButtonProps {
  label: string;
  onPress: () => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const SIZE = {
  sm: {
    height: 40,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  md: {
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  lg: {
    height: 56,
    paddingHorizontal: 20,
    fontSize: 18,
  },
};

export function TextButton({
  label,
  onPress,
  size = "md",
  disabled = false,
}: TextButtonProps) {
  const s = SIZE[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
          opacity: pressed ? 0.6 : disabled ? 0.4 : 1,
        },
      ]}
    >
      <Text style={[styles.label, { fontSize: s.fontSize }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#71717a",
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});
