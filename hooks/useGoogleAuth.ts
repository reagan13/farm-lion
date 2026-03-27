import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { auth, db } from "../services/firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = (
  onSuccess: () => void,
  onError: (msg: string) => void,
) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({
      scheme: "matiecom",
    }),
  });

  useEffect(() => {
    const handleAuth = async () => {
      if (response?.type === "success") {
        const { id_token } = response.params;

        if (!id_token) {
          onError("No ID token received.");
          return;
        }

        const credential = GoogleAuthProvider.credential(id_token);

        try {
          const result = await signInWithCredential(auth, credential);
          const userRef = doc(db, "users", result.user.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            await setDoc(userRef, {
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName ?? "User",
              photoURL: result.user.photoURL ?? null,
              role: "consumer",
              createdAt: serverTimestamp(),
            });
          }
          onSuccess();
        } catch (err: any) {
          onError(err.message);
        }
      } else if (response?.type === "error") {
        onError("Google Login Failed");
      }
    };

    handleAuth();
  }, [response]);

  return { request, promptAsync, disabled: !request };
};
