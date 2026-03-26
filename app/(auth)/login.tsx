import { KulimPark_400Regular } from "@expo-google-fonts/kulim-park";
import { Unbounded_800ExtraBold, useFonts } from "@expo-google-fonts/unbounded";
import { useRouter } from "expo-router";
import { ArrowLeft, Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react-native";
import { MotiView } from "moti";
import React from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthBackground } from "../../components/auth/AuthBackground";
import { AuthInput } from "../../components/auth/AuthInput";
import { Button } from "../../components/ui/Button";
import { THEME } from "../../constants/cons";
import { useAppTheme } from "../../context/ThemeContext";
import { useLoginForm } from "../../hooks/useAuthForm";

const FarmingLionImg = require("../../assets/images/farming_lion.png");

export default function LoginScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const C = THEME[theme];

  const [fontsLoaded] = useFonts({
    Unbounded_800ExtraBold,
    KulimPark_400Regular,
  });

  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    togglePasswordVisible,
    loading,
    setLoading,
    isKeyboardVisible,
  } = useLoginForm();

  const handleLogin = async () => {
    if (!email || !password)
      return Alert.alert("Error", "Please fill all fields");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/");
    }, 1500);
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <AuthBackground C={C} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          scrollEnabled={isKeyboardVisible}
          bounces={isKeyboardVisible}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back button */}
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} style={styles.iconBtn}>
              <ArrowLeft size={20} color={C.muted} strokeWidth={2} />
            </Pressable>
          </View>

          <View style={styles.content}>
            {/* Logo */}
            <MotiView
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "timing", duration: 700 }}
              style={styles.imageHeader}
            >
              <Image
                source={FarmingLionImg}
                style={styles.lionImage}
                resizeMode="contain"
              />
            </MotiView>

            {/* Heading */}
            <View style={styles.textHeader}>
              <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 200 }}
              >
                <Text
                  style={[
                    styles.greetingText,
                    { color: C.muted, fontFamily: "KulimPark_400Regular" },
                  ]}
                >
                  Welcome back!
                </Text>
                <Text
                  style={[
                    styles.title,
                    {
                      color: C.foreground,
                      fontFamily: "Unbounded_800ExtraBold",
                    },
                  ]}
                >
                  Login
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    { color: C.muted, fontFamily: "KulimPark_400Regular" },
                  ]}
                >
                  Access your academic dashboard.
                </Text>
              </MotiView>
            </View>

            {/* Form */}
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 300 }}
              style={styles.form}
            >
              <AuthInput
                icon={Mail}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                C={C}
                fontsLoaded={fontsLoaded}
              />

              <AuthInput
                icon={Lock}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                C={C}
                fontsLoaded={fontsLoaded}
                rightElement={
                  <Pressable
                    onPress={togglePasswordVisible}
                    style={styles.eyeBtn}
                  >
                    {passwordVisible ? (
                      <EyeOff size={18} color={C.muted} />
                    ) : (
                      <Eye size={18} color={C.muted} />
                    )}
                  </Pressable>
                }
              />

              {/* Forgot password */}
              <Pressable style={styles.forgotLink} onPress={() => {}}>
                <Text
                  style={[
                    styles.forgotText,
                    { color: C.accent, fontFamily: "KulimPark_400Regular" },
                  ]}
                >
                  Forgot password?
                </Text>
              </Pressable>

              {/* Login button */}
              <View style={styles.buttonContainer}>
                <Button
                  label={loading ? "Logging in..." : "Login"}
                  onPress={handleLogin}
                  loading={loading}
                  variant="primary"
                  size="lg"
                  fullWidth
                  iconRight={<LogIn size={18} color="#FFF" />}
                  style={{ height: 56, borderRadius: 16 }}
                />
              </View>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={[styles.divider, { backgroundColor: C.border }]} />
                <Text
                  style={[
                    styles.dividerText,
                    { color: C.muted, fontFamily: "KulimPark_400Regular" },
                  ]}
                >
                  OR
                </Text>
                <View style={[styles.divider, { backgroundColor: C.border }]} />
              </View>

              {/* Google */}
              <Pressable
                style={[
                  styles.googleBtn,
                  { backgroundColor: C.card, borderColor: C.border },
                ]}
                onPress={() => {}}
              >
                <Image
                  source={{
                    uri: "https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png",
                  }}
                  style={styles.googleIcon}
                />
                <Text
                  style={[
                    styles.googleText,
                    { color: C.foreground, fontFamily: "KulimPark_400Regular" },
                  ]}
                >
                  Sign in with Google
                </Text>
              </Pressable>

              {/* Register link */}
              <Pressable
                onPress={() => router.push("/(auth)/register")}
                style={styles.footerLink}
              >
                <Text
                  style={[
                    styles.footerText,
                    { color: C.muted, fontFamily: "KulimPark_400Regular" },
                  ]}
                >
                  Don&apos;t have an account?{" "}
                  <Text style={{ color: C.accent }}>Sign Up</Text>
                </Text>
              </Pressable>
            </MotiView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { height: 50, paddingHorizontal: 16, justifyContent: "center" },
  iconBtn: { width: 40, height: 40, justifyContent: "center" },
  content: { flex: 1, paddingHorizontal: 16, paddingBottom: 15 },
  imageHeader: { alignItems: "center", marginBottom: 10 },
  lionImage: { width: 85, height: 85, borderRadius: 20 },
  textHeader: { marginBottom: 15 },
  greetingText: { fontSize: 14, marginBottom: 2 },
  title: { fontSize: 26, letterSpacing: -1, marginBottom: 4 },
  subtitle: { fontSize: 13, opacity: 0.7 },
  form: { gap: 18 },
  eyeBtn: { padding: 8 },
  forgotLink: { alignItems: "flex-end", marginTop: -4 },
  forgotText: { fontSize: 13 },
  buttonContainer: { marginTop: 6 },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  divider: { flex: 1, height: 1, opacity: 0.5 },
  dividerText: { marginHorizontal: 16, fontSize: 10, opacity: 0.6 },
  googleBtn: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  googleIcon: { width: 20, height: 20 },
  googleText: { fontSize: 15 },
  footerLink: { alignItems: "center", marginTop: 5 },
  footerText: { fontSize: 14 },
});
