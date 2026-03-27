import { KulimPark_400Regular } from "@expo-google-fonts/kulim-park";
import { Unbounded_800ExtraBold, useFonts } from "@expo-google-fonts/unbounded";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react-native";
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
import { PasswordStrengthIndicator } from "../../components/auth/PasswordStrengthIndicator";
import { Button } from "../../components/ui/Button";
import { THEME } from "../../constants/cons";
import { useAppTheme } from "../../context/ThemeContext";
import { useRegisterForm } from "../../hooks/useAuthForm";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { auth, db } from "../../services/firebaseConfig";

const FarmingLionImg = require("../../assets/images/farming_lion.png");

export default function RegisterScreen() {
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
    confirmPassword,
    setConfirmPassword,
    passVisible,
    togglePassVisible,
    confirmPassVisible,
    toggleConfirmPassVisible,
    isKeyboardVisible,
    passwordFocused,
    setPasswordFocused,
    passwordsMismatch,
    isFormValid,
  } = useRegisterForm();

  const { request, promptAsync } = useGoogleAuth(
    () => router.replace("/"),
    (msg) => Alert.alert("Google Sign-In Error", msg),
  );

  const saveUserToFirestore = async (user: any) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "Farmer",
          role: "consumer",
          location: "Mati City",
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Firestore Error:", error);
    }
  };

  const handleManualRegister = async () => {
    if (!isFormValid) return;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserToFirestore(res.user);
      router.replace("/");
    } catch (error: any) {
      let message = error.message;
      if (error.code === "auth/email-already-in-use") {
        message = "An account with this email already exists.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (error.code === "auth/network-request-failed") {
        message = "Network error. Please check your connection.";
      }
      Alert.alert("Registration Error", message);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.root}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: C.background }]}
      >
        <AuthBackground C={C} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            scrollEnabled={isKeyboardVisible}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.topBar}>
              <Pressable onPress={() => router.back()} style={styles.iconBtn}>
                <ArrowLeft size={20} color={C.muted} strokeWidth={2} />
              </Pressable>
            </View>

            <View style={styles.content}>
              <View style={styles.imageHeader}>
                <Image
                  source={FarmingLionImg}
                  style={styles.lionImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.textHeader}>
                <Text
                  style={[
                    styles.greetingText,
                    { color: C.muted, fontFamily: "KulimPark_400Regular" },
                  ]}
                >
                  Join us today,
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
                  Sign Up
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    { color: C.muted, fontFamily: "KulimPark_400Regular" },
                  ]}
                >
                  Start your farming trade journey.
                </Text>
              </View>

              <View style={styles.form}>
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
                  secureTextEntry={!passVisible}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  C={C}
                  fontsLoaded={fontsLoaded}
                  rightElement={
                    <Pressable
                      onPress={togglePassVisible}
                      style={styles.eyeBtn}
                    >
                      {passVisible ? (
                        <EyeOff size={18} color={C.muted} />
                      ) : (
                        <Eye size={18} color={C.muted} />
                      )}
                    </Pressable>
                  }
                />

                <View>
                  <AuthInput
                    icon={Lock}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!confirmPassVisible}
                    error={passwordsMismatch}
                    C={C}
                    fontsLoaded={fontsLoaded}
                    rightElement={
                      <Pressable
                        onPress={toggleConfirmPassVisible}
                        style={styles.eyeBtn}
                      >
                        {confirmPassVisible ? (
                          <EyeOff size={18} color={C.muted} />
                        ) : (
                          <Eye size={18} color={C.muted} />
                        )}
                      </Pressable>
                    }
                  />
                  {passwordsMismatch && (
                    <MotiView
                      from={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={styles.errorRow}
                    >
                      <Text
                        style={[
                          styles.errorText,
                          { fontFamily: "KulimPark_400Regular" },
                        ]}
                      >
                        Passwords do not match
                      </Text>
                    </MotiView>
                  )}
                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    label="Create Account"
                    onPress={handleManualRegister}
                    disabled={!isFormValid}
                    variant="primary"
                    size="lg"
                    fullWidth
                    style={{
                      height: 56,
                      borderRadius: 16,
                      opacity: isFormValid ? 1 : 0.5,
                    }}
                  />
                </View>

                <View style={styles.dividerContainer}>
                  <View
                    style={[styles.divider, { backgroundColor: C.border }]}
                  />
                  <Text
                    style={[
                      styles.dividerText,
                      { color: C.muted, fontFamily: "KulimPark_400Regular" },
                    ]}
                  >
                    OR
                  </Text>
                  <View
                    style={[styles.divider, { backgroundColor: C.border }]}
                  />
                </View>

                <Pressable
                  style={[
                    styles.googleBtn,
                    {
                      backgroundColor: C.card,
                      borderColor: C.border,
                      opacity: request ? 1 : 0.6,
                    },
                  ]}
                  onPress={() => promptAsync()}
                  disabled={!request}
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
                      {
                        color: C.foreground,
                        fontFamily: "KulimPark_400Regular",
                      },
                    ]}
                  >
                    Sign up with Google
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <PasswordStrengthIndicator
        password={password}
        visible={passwordFocused || password.length > 0}
        C={C}
        fontsLoaded={fontsLoaded}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
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
  errorRow: { marginTop: 6 },
  errorText: { fontSize: 12, color: "#EF4444" },
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
});
