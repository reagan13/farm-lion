import {
  KulimPark_300Light,
  KulimPark_400Regular,
} from "@expo-google-fonts/kulim-park";
import {
  Unbounded_700Bold,
  Unbounded_800ExtraBold,
} from "@expo-google-fonts/unbounded";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Dimensions, ViewToken } from "react-native";
import { useAppTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

export function useOnboarding(slidesCount: number) {
  const { theme, toggleTheme } = useAppTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    Unbounded_800ExtraBold,
    Unbounded_700Bold,
    KulimPark_400Regular,
    KulimPark_300Light,
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index ?? 0);
    },
  ).current;

  const handleNext = () => {
    if (activeIndex < slidesCount - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      router.replace("/(auth)/login");
    }
  };

  const isLast = activeIndex === slidesCount - 1;

  return {
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
  };
}
