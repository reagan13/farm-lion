import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useAppTheme } from "../../context/ThemeContext";

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize = "sentences",
}: InputProps) {
  const { theme } = useAppTheme();
  const isDark = theme === "dark";

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: isDark ? "#a1a1aa" : "#71717a" }]}>
        {label}
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#18181b" : "#f4f4f5",
            color: isDark ? "#ffffff" : "#09090b",
            borderColor: isDark ? "#27272a" : "#e4e4e7",
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#52525b" : "#a1a1aa"}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },

  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },

  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
