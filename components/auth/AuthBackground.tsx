import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Easing } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export const AuthBackground = ({ C }: { C: any }) => {
  const gap = 20;
  const columns = Math.ceil(width / gap);
  const rows = Math.ceil(height / gap);

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: C.background, overflow: "hidden" },
      ]}
    >
      {/* Dot grid */}
      <View style={styles.dotContainer}>
        {Array.from({ length: rows }).map((_, r) => (
          <View key={`r-${r}`} style={styles.dotRow}>
            {Array.from({ length: columns }).map((_, c) => (
              <View
                key={`d-${r}-${c}`}
                style={[styles.dot, { backgroundColor: C.muted }]}
              />
            ))}
          </View>
        ))}
      </View>

      {/* Animated scan line */}
      <MotiView
        from={{ translateY: -height * 0.5 }}
        animate={{ translateY: height }}
        transition={{
          loop: true,
          duration: 4000,
          type: "timing",
          easing: Easing.linear,
        }}
        style={StyleSheet.absoluteFill}
      >
        <LinearGradient
          colors={["transparent", C.accent, "transparent"]}
          style={styles.scanLine}
        />
      </MotiView>

      {/* Edge fade */}
      <LinearGradient
        colors={[C.background, "transparent", "transparent", C.background]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: { ...StyleSheet.absoluteFillObject },
  dotRow: { flexDirection: "row" },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    marginRight: 18,
    marginBottom: 18,
    opacity: 0.15,
  },
  scanLine: { height: 300, width: "100%", opacity: 0.12 },
});
