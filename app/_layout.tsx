import AsyncStorage from "@react-native-async-storage/async-storage"; // Added
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react"; // Added useEffect/useState
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProviderWrapper, useAppTheme } from "../context/ThemeContext";

function RootLayoutContent() {
  const { theme } = useAppTheme();
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Check if user has seen onboarding before
    const checkOnboarding = async () => {
      try {
        const hasSeen = await AsyncStorage.getItem("hasSeenOnboarding");
        setIsFirstTime(hasSeen === null);
      } catch (e) {
        setIsFirstTime(false);
      }
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (isFirstTime === null) return;

    const inOnboardingGroup = segments[0] === "onboarding";

    // If not first time and user is trying to see onboarding, kick them to login
    if (!isFirstTime && inOnboardingGroup) {
      router.replace("/(auth)/login");
    }
  }, [isFirstTime, segments]);

  // Prevent UI flash while checking storage
  if (isFirstTime === null) return null;

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* If they are new, show onboarding as the top of the stack */}
        {isFirstTime ? (
          <Stack.Screen name="onboarding/index" />
        ) : (
          <Stack.Screen name="(auth)/login" />
        )}
        <Stack.Screen name="(auth)/register" />
      </Stack>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProviderWrapper>
        <RootLayoutContent />
      </ThemeProviderWrapper>
    </SafeAreaProvider>
  );
}
