import { MotiView } from "moti";
import React, { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from "react-native";
import { Easing } from "react-native-reanimated";

interface AuthInputProps {
  icon: React.ElementType;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  rightElement?: React.ReactNode;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: KeyboardTypeOptions;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: boolean;
  C: any;
  fontsLoaded: boolean;
}

export const AuthInput = ({
  icon: Icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  rightElement,
  autoCapitalize,
  keyboardType,
  onFocus,
  onBlur,
  error,
  C,
  fontsLoaded,
}: AuthInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const lineColor = error ? "#EF4444" : C.accent;

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputContent}>
        <Icon
          size={18}
          color={error ? "#EF4444" : isFocused ? C.accent : C.muted}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={C.muted}
          style={[
            styles.input,
            { color: C.foreground },
            fontsLoaded && { fontFamily: "KulimPark_400Regular" },
          ]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
        />
        {rightElement}
      </View>

      <View
        style={[
          styles.baseLine,
          { backgroundColor: error ? "#EF4444" : C.border },
        ]}
      />
      <MotiView
        animate={{ scaleX: isFocused ? 1 : 0, opacity: isFocused ? 1 : 0 }}
        transition={{
          type: "timing",
          duration: 350,
          easing: Easing.out(Easing.quad),
        }}
        style={[styles.animatedLine, { backgroundColor: lineColor }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { width: "100%", height: 44, position: "relative" },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 4,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15 },
  baseLine: {
    height: 1,
    width: "100%",
    position: "absolute",
    bottom: 0,
    opacity: 0.3,
  },
  animatedLine: { height: 2, width: "100%", position: "absolute", bottom: 0 },
});
