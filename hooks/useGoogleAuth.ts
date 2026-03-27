import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { auth, db } from "../services/firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

const WEB_CLIENT_ID =
  "323981884251-olvfpmeif2vafu1i6pis0rlg4p01h3n3.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "323981884251-6sku50egmg8pphdr2996gt2slb1otp8i.apps.googleusercontent.com";

export const useGoogleAuth = (
  onSuccess: () => void,
  onError: (msg: string) => void,
) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: WEB_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type !== "success") return;

    const idToken =
      response.params?.id_token ?? response.authentication?.idToken;

    if (!idToken) {
      onError("Google sign-in failed: no ID token received.");
      return;
    }

    const credential = GoogleAuthProvider.credential(idToken);

    signInWithCredential(auth, credential)
      .then(async (result) => {
        const userRef = doc(db, "users", result.user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName ?? "User",
            photoURL: result.user.photoURL ?? null,
            role: "pending",
            location: "Mati City",
            createdAt: serverTimestamp(),
          });
        }

        onSuccess();
      })
      .catch((err) => onError(err.message));
  }, [response]);

  return { request, promptAsync, disabled: !request };
};
