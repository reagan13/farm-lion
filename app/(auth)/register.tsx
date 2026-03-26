import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserPlus,
} from "lucide-react-native";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "../../components/ui/Button";
import { THEME } from "../../constants/cons";
import { useAppTheme } from "../../context/ThemeContext";

const { width, height } = Dimensions.get("window");
const FarmingLionImg = require("../../assets/images/farming_lion.png");

// ─── Sub-Components ──────────────────────────────────────────────────

const UnderlineInput = ({
  icon: Icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  rightElement,
  autoCapitalize,
  C,
}: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputContent}>
        <Icon
          size={18}
          color={isFocused ? C.accent : C.muted}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={C.muted}
          style={[
            styles.input,
            { color: C.foreground, fontFamily: "KulimPark_400Regular" },
          ]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize={autoCapitalize}
        />
        {rightElement}
      </View>
      <View style={[styles.baseLine, { backgroundColor: C.border }]} />
      <MotiView
        animate={{ scaleX: isFocused ? 1 : 0, opacity: isFocused ? 1 : 0 }}
        transition={{
          type: "timing",
          duration: 350,
          easing: Easing.out(Easing.quad),
        }}
        style={[styles.animatedLine, { backgroundColor: C.accent }]}
      />
    </View>
  );
};

const DotGridBackground = ({ C }: { C: any }) => {
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
      <LinearGradient
        colors={[C.background, "transparent", "transparent", C.background]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
};

// ─── Main Screen ─────────────────────────────────────────────────────

export default function RegisterScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const C = THEME[theme];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleRegister = () => {
    // Add your registration logic here
    console.log("Registering user:", { email, password });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <DotGridBackground C={C} />

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
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} style={styles.iconBtn}>
              <ArrowLeft size={20} color={C.muted} strokeWidth={2} />
            </Pressable>
          </View>

          <View style={styles.content}>
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
                  Secure your academic journey now.
                </Text>
              </MotiView>
            </View>

            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 300 }}
              style={styles.form}
            >
              <UnderlineInput
                icon={Mail}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                C={C}
              />

              <UnderlineInput
                icon={Lock}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passVisible}
                C={C}
                rightElement={
                  <Pressable
                    onPress={() => setPassVisible(!passVisible)}
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

              <UnderlineInput
                icon={Lock}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!confirmPassVisible}
                C={C}
                rightElement={
                  <Pressable
                    onPress={() => setConfirmPassVisible(!confirmPassVisible)}
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

              <View style={styles.buttonContainer}>
                <Button
                  label="Create Account"
                  onPress={handleRegister}
                  variant="primary"
                  size="lg"
                  fullWidth
                  iconRight={<UserPlus size={18} color="#FFF" />}
                />
              </View>

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
                  Sign up with Google
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/(auth)/login")}
                style={styles.footerLink}
              >
                <Text
                  style={[
                    styles.footerText,
                    { color: C.muted, fontFamily: "KulimPark_400Regular" },
                  ]}
                >
                  Already have an account?{" "}
                  <Text style={{ color: C.accent }}>Login</Text>
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
  topBar: { height: 50, paddingHorizontal: 16, justifyContent: "center" },
  content: { flex: 1, paddingHorizontal: 16, paddingBottom: 15 },
  iconBtn: { width: 40, height: 40, justifyContent: "center" },
  imageHeader: { alignItems: "center", marginBottom: 10 },
  lionImage: { width: 85, height: 85, borderRadius: 20 },
  textHeader: { marginBottom: 15 },
  greetingText: { fontSize: 14, marginBottom: 2 },
  title: { fontSize: 26, letterSpacing: -1, marginBottom: 4 },
  subtitle: { fontSize: 13, opacity: 0.7 },
  form: { gap: 18 },
  inputContainer: { width: "100%", height: 44, position: "relative" },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 4,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15 },
  baseLine: {
    height: 1,
    width: "100%",
    position: "absolute",
    bottom: 0,
    opacity: 0.3,
  },
  animatedLine: { height: 2, width: "100%", position: "absolute", bottom: 0 },
  eyeBtn: { padding: 8 },
  buttonContainer: {
    marginTop: 6,
    height: 56,
    borderRadius: 16,
    overflow: "hidden",
  },
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
  googleText: { fontSize: 15, fontWeight: "600" },
  footerLink: { alignItems: "center", marginTop: 5 },
  footerText: { fontSize: 14 },
});
