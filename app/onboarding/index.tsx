import { router } from "expo-router";
import { ArrowRight, Moon, Settings, Sun, X } from "lucide-react-native";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slide } from "../../components/onboarding/SlideIllustration";
import { Button } from "../../components/ui/Button";
import { TextButton } from "../../components/ui/TextButton";
import { SLIDES, THEME } from "../../constants/cons";
import { useOnboarding } from "../../hooks/useOnboarding";

export default function Onboarding() {
  const {
    theme,
    toggleTheme,
    menuVisible,
    setMenuVisible,
    activeIndex,
    flatListRef,
    scrollX,
    fontsLoaded,
    onViewableItemsChanged,
    handleNext,
    isLast,
    width,
  } = useOnboarding(SLIDES.length);
  const C = THEME[theme];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: C.background }]}
      edges={["top", "left", "right"]}
    >
      <View style={styles.topBar}>
        <Pressable onPress={() => setMenuVisible(true)} style={styles.iconBtn}>
          <Settings size={20} color={C.muted} strokeWidth={2} />
        </Pressable>
        {!isLast && (
          <TextButton
            label="Skip"
            onPress={() => router.replace("/(auth)/login")}
            size="sm"
          />
        )}
      </View>

      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        renderItem={({ item, index }) => (
          <Slide
            item={item}
            fontsLoaded={!!fontsLoaded}
            C={C}
            isActive={activeIndex === index}
          />
        )}
      />

      <View style={styles.bottomBar}>
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => {
            const opacity = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.2, 1, 0.2],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={[styles.dot, { backgroundColor: C.foreground, opacity }]}
              />
            );
          })}
        </View>

        <Button
          label={isLast ? "Get Started" : "Next"}
          onPress={handleNext}
          variant="primary"
          size="md"
          iconRight={<ArrowRight size={16} color="#FFFFFF" strokeWidth={3} />}
        />
      </View>

      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable
          style={[styles.modalOverlay, { backgroundColor: C.overlay }]}
          onPress={() => setMenuVisible(false)}
        >
          <View
            style={[
              styles.menuCard,
              { backgroundColor: C.card, borderColor: C.border },
            ]}
          >
            <View style={styles.menuHeader}>
              <Text
                style={[
                  styles.menuTitle,
                  { color: C.foreground },
                  fontsLoaded && { fontFamily: "Unbounded_700Bold" },
                ]}
              >
                Appearance
              </Text>
              <Pressable onPress={() => setMenuVisible(false)}>
                <X size={18} color={C.muted} />
              </Pressable>
            </View>
            <Pressable
              style={[
                styles.menuOption,
                theme === "light" && { backgroundColor: C.border },
              ]}
              onPress={() => {
                if (theme !== "light") toggleTheme();
                setMenuVisible(false);
              }}
            >
              <Sun size={18} color={C.foreground} />
              <Text
                style={[
                  styles.optionText,
                  { color: C.foreground },
                  fontsLoaded && { fontFamily: "KulimPark_400Regular" },
                ]}
              >
                Light Mode
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.menuOption,
                theme === "dark" && { backgroundColor: C.border },
              ]}
              onPress={() => {
                if (theme !== "dark") toggleTheme();
                setMenuVisible(false);
              }}
            >
              <Moon size={18} color={C.foreground} />
              <Text
                style={[
                  styles.optionText,
                  { color: C.foreground },
                  fontsLoaded && { fontFamily: "KulimPark_400Regular" },
                ]}
              >
                Dark Mode
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 50,
    alignItems: "center",
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  dotsRow: { flexDirection: "row", gap: 8 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  menuCard: {
    width: "100%",
    maxWidth: 300,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  menuTitle: { fontSize: 16 },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  optionText: { fontSize: 15 },
});
