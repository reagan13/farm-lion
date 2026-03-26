import { useEffect, useMemo, useState } from "react";
import { Keyboard } from "react-native";

// ─── Password validation rules ────────────────────────────────────────────────
export interface PasswordRule {
  key: string;
  label: string;
  test: (password: string) => boolean;
}

export const PASSWORD_RULES: PasswordRule[] = [
  {
    key: "minLength",
    label: "At least 8 characters",
    test: (p) => p.length >= 8,
  },
  {
    key: "uppercase",
    label: "One uppercase letter (A–Z)",
    test: (p) => /[A-Z]/.test(p),
  },
  {
    key: "lowercase",
    label: "One lowercase letter (a–z)",
    test: (p) => /[a-z]/.test(p),
  },
  {
    key: "number",
    label: "One number (0–9)",
    test: (p) => /[0-9]/.test(p),
  },
  {
    key: "special",
    label: "One special character (!@#$...)",
    test: (p) => /[^A-Za-z0-9]/.test(p),
  },
];

export const usePasswordValidation = (password: string) => {
  const results = useMemo(
    () =>
      PASSWORD_RULES.map((rule) => ({
        ...rule,
        passed: rule.test(password),
      })),
    [password],
  );

  const passedCount = results.filter((r) => r.passed).length;
  const isValid = passedCount === PASSWORD_RULES.length;
  const strength = Math.min(
    4,
    Math.floor((passedCount / PASSWORD_RULES.length) * 4),
  );

  return { results, passedCount, isValid, strength };
};

// ─── Login form state ─────────────────────────────────────────────────────────
export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    togglePasswordVisible: () => setPasswordVisible((v) => !v),
    loading,
    setLoading,
    isKeyboardVisible,
  };
};

// ─── Register form state ──────────────────────────────────────────────────────
export const useRegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const passwordValidation = usePasswordValidation(password);
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;
  const isFormValid =
    email.length > 0 && passwordValidation.isValid && passwordsMatch;

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

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passVisible,
    togglePassVisible: () => setPassVisible((v) => !v),
    confirmPassVisible,
    toggleConfirmPassVisible: () => setConfirmPassVisible((v) => !v),
    isKeyboardVisible,
    passwordFocused,
    setPasswordFocused,
    passwordValidation,
    passwordsMatch,
    passwordsMismatch,
    isFormValid,
  };
};
