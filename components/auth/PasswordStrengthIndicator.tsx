import { MotiView } from "moti";
import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePasswordValidation } from "../../hooks/useAuthForm";

interface Props {
  password: string;
  visible: boolean;
  C: any;
  fontsLoaded: boolean;
}

const STRENGTH_META = [
  {
    label: "Weak",
    color: "#EF4444",
    bg: "#1a0a0a",
    border: "rgba(239,68,68,0.35)",
  },
  {
    label: "Fair",
    color: "#F97316",
    bg: "#1a0e07",
    border: "rgba(249,115,22,0.35)",
  },
  {
    label: "Good",
    color: "#EAB308",
    bg: "#191400",
    border: "rgba(234,179,8,0.35)",
  },
  {
    label: "Strong",
    color: "#22C55E",
    bg: "#071a0e",
    border: "rgba(34,197,94,0.35)",
  },
];

const { width } = Dimensions.get("window");

export const PasswordStrengthIndicator = ({
  password,
  visible,
  C,
  fontsLoaded,
}: Props) => {
  const insets = useSafeAreaInsets();
  const { results, passedCount, strength } = usePasswordValidation(password);
  const showCard = visible && password.length > 0;
  const meta = STRENGTH_META[Math.min(strength, 3)];
  const fontStyle = fontsLoaded ? { fontFamily: "KulimPark_400Regular" } : {};
  const topOffset = insets.top + (Platform.OS === "android" ? 8 : 4);

  return (
    <MotiView
      animate={{
        translateY: showCard ? topOffset : -(200 + topOffset),
        opacity: showCard ? 1 : 0,
      }}
      transition={{
        type: "spring",
        damping: 18,
        stiffness: 160,
        mass: 0.9,
      }}
      style={[
        styles.notification,
        {
          backgroundColor: meta.bg,
          borderColor: meta.border,
        },
      ]}
      pointerEvents={showCard ? "none" : "none"}
    >
      {/* Top accent line */}
      <View style={[styles.accentLine, { backgroundColor: meta.color }]} />

      {/* Header row */}
      <View style={styles.header}>
        {/* Left: icon dot + title */}
        <View style={styles.titleRow}>
          <MotiView
            animate={{ backgroundColor: meta.color }}
            transition={{ type: "timing", duration: 300 }}
            style={styles.iconDot}
          />
          <Text style={[styles.title, { color: meta.color }, fontStyle]}>
            Password strength
          </Text>
        </View>

        {/* Right: strength badge */}
        <View style={[styles.badge, { borderColor: meta.border }]}>
          <Text style={[styles.badgeText, { color: meta.color }, fontStyle]}>
            {meta.label}
          </Text>
        </View>
      </View>

      {/* Strength bar */}
      <View style={styles.barRow}>
        {[0, 1, 2, 3].map((i) => (
          <MotiView
            key={i}
            animate={{
              backgroundColor:
                i < passedCount ? meta.color : "rgba(255,255,255,0.08)",
            }}
            transition={{ type: "timing", duration: 300 }}
            style={styles.barSegment}
          />
        ))}
      </View>

      {/* Rules 2-column grid */}
      <View style={styles.rulesGrid}>
        {results.map((rule) => (
          <View key={rule.key} style={styles.ruleItem}>
            <MotiView
              animate={{
                backgroundColor: rule.passed
                  ? "#22C55E"
                  : "rgba(255,255,255,0.2)",
                scale: rule.passed ? 1.2 : 1,
              }}
              transition={{ type: "spring", damping: 14, stiffness: 200 }}
              style={styles.ruleDot}
            />
            <Text
              style={[
                styles.ruleText,
                { color: rule.passed ? "#22C55E" : "rgba(255,255,255,0.45)" },
                fontStyle,
                rule.passed && styles.ruleTextPassed,
              ]}
              numberOfLines={1}
            >
              {rule.label}
            </Text>
          </View>
        ))}
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  notification: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    zIndex: 999,
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
    // Frosted dark glass feel
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 16,
  },
  accentLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  barRow: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 12,
  },
  barSegment: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
  rulesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 7,
    columnGap: 8,
  },
  ruleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: "47%",
  },
  ruleDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    flexShrink: 0,
  },
  ruleText: {
    fontSize: 11,
    flex: 1,
  },
  ruleTextPassed: {
    textDecorationLine: "line-through",
    opacity: 0.55,
  },
});
