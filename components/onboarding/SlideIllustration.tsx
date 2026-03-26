import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { GRID_SIZE, STEP } from "../../constants/cons";

const { width } = Dimensions.get("window");

export function SlideIllustration({ Icon, C }: { Icon: any; C: any }) {
  const lines = Array.from({ length: GRID_SIZE / STEP + 1 });
  return (
    <View style={styles.illustrationWrapper}>
      <View
        style={[styles.gridCanvas, { width: GRID_SIZE, height: GRID_SIZE }]}
      >
        {lines.map((_, i) => (
          <View
            key={`v-${i}`}
            style={[styles.lineV, { left: i * STEP, backgroundColor: C.gridV }]}
          />
        ))}
        {lines.map((_, i) => (
          <View
            key={`h-${i}`}
            style={[styles.lineH, { top: i * STEP, backgroundColor: C.gridH }]}
          />
        ))}
        <LinearGradient
          colors={[C.background, "transparent", "transparent", C.background]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={[C.background, "transparent", "transparent", C.background]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <View
        style={[
          styles.iconCard,
          { backgroundColor: C.card, borderColor: C.border },
        ]}
      >
        <Icon size={42} color={C.foreground} strokeWidth={1.2} />
      </View>
      <View style={[styles.decorationRing, { borderColor: C.border }]} />
    </View>
  );
}

export function Slide({
  item,
  fontsLoaded,
  C,
  isActive,
}: {
  item: any;
  fontsLoaded: boolean;
  C: any;
  isActive: boolean;
}) {
  return (
    <View style={{ width }}>
      <View style={styles.slideTop}>
        <MotiView
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
          transition={{ type: "timing", duration: 600 }}
        >
          <SlideIllustration Icon={item.Icon} C={C} />
        </MotiView>
      </View>
      <View style={styles.slideContent}>
        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{
            opacity: isActive ? 1 : 0,
            translateX: isActive ? 0 : -20,
          }}
          transition={{ type: "timing", duration: 500, delay: 100 }}
          style={[styles.tagPill, { borderColor: C.border }]}
        >
          <Text
            style={[
              styles.tagText,
              { color: C.foreground },
              fontsLoaded && { fontFamily: "KulimPark_400Regular" },
            ]}
          >
            {item.tag.toUpperCase()}
          </Text>
        </MotiView>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: isActive ? 1 : 0, translateY: isActive ? 0 : 20 }}
          transition={{ type: "timing", duration: 600, delay: 200 }}
        >
          <Text
            style={[
              styles.title,
              { color: C.foreground },
              fontsLoaded && { fontFamily: "Unbounded_800ExtraBold" },
            ]}
          >
            {item.title}
          </Text>
        </MotiView>
        <MotiView
          from={{ opacity: 0, translateX: 20 }}
          animate={{ opacity: isActive ? 1 : 0, translateX: isActive ? 0 : 20 }}
          transition={{ type: "timing", duration: 700, delay: 300 }}
        >
          <Text
            style={[
              styles.body,
              { color: C.muted },
              fontsLoaded && { fontFamily: "KulimPark_400Regular" },
            ]}
          >
            {item.body}
          </Text>
        </MotiView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  illustrationWrapper: {
    width: 240,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  gridCanvas: { position: "absolute", overflow: "hidden" },
  lineV: { position: "absolute", width: 1, height: "100%" },
  lineH: { position: "absolute", height: 1, width: "100%" },
  iconCard: {
    width: 100,
    height: 100,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  decorationRing: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderStyle: "dashed",
    opacity: 0.2,
  },
  slideTop: { flex: 1, justifyContent: "center", alignItems: "center" },
  slideContent: { paddingHorizontal: 16, paddingBottom: 40, gap: 16 },
  tagPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagText: { fontSize: 10, letterSpacing: 1, fontWeight: "700" },
  title: { fontSize: 32, lineHeight: 40, letterSpacing: -1 },
  body: { fontSize: 16, lineHeight: 24 },
});
