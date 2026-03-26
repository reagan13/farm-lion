import { Package, ShoppingCart, Store } from "lucide-react-native";

export const GRID_SIZE = 200;
export const STEP = 20;

export const THEME = {
  light: {
    background: "#ffffff",
    foreground: "#09090b",
    card: "#ffffff",
    border: "#e4e4e7",
    muted: "#71717a",
    accent: "#09090b",
    invert: "#ffffff",
    overlay: "rgba(0,0,0,0.4)",
    gridV: "rgba(249, 115, 22, 0.15)",
    gridH: "rgba(14, 165, 233, 0.15)",
  },
  dark: {
    background: "#09090b",
    foreground: "#ffffff",
    card: "#18181b",
    border: "#27272a",
    muted: "#a1a1aa",
    accent: "#ffffff",
    invert: "#09090b",
    overlay: "rgba(0,0,0,0.7)",
    gridV: "rgba(249, 115, 22, 0.3)",
    gridH: "rgba(14, 165, 233, 0.3)",
  },
} as const;

export const SLIDES = [
  {
    id: "1",
    tag: "Marketplace",
    title: "The modern way\nto farm and trade.",
    body: "Premium e-commerce built for local empowerment. Seamlessly connecting Mati's best to the digital world.",
    Icon: Store,
  },
  {
    id: "2",
    tag: "Logistics",
    title: "From farm gates\nto front doors.",
    body: "Efficient tracking and professional handling. Your goods, moved with the strength and speed of a lion.",
    Icon: Package,
  },
  {
    id: "3",
    tag: "Experience",
    title: "Elevated shopping.\nLocal roots.",
    body: "A curated experience designed for trust. Discover the highest quality local produce in a single tap.",
    Icon: ShoppingCart,
  },
];
