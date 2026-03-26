// constants/Colors.ts
import { Appearance } from "react-native";

const isDark = Appearance.getColorScheme() === "dark";

export const Colors = {
  light: {
    background: "#ffffff",
    foreground: "#09090b",
    card: "#ffffff",
    border: "#e4e4e7",
    muted: "#71717a",
    tabIconDefault: "#9ca3af",
  },
  dark: {
    background: "#09090b",
    foreground: "#ffffff",
    card: "#09090b",
    border: "#27272a",
    muted: "#a1a1aa",
    tabIconDefault: "#4b5563",
  },
};

export type Theme = typeof Colors.light;
