import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIahYXcYWPok9Ijk2lZH3Gh0nDoiU2lUg",
  authDomain: "fir-7818a.firebaseapp.com",
  projectId: "fir-7818a",
  storageBucket: "fir-7818a.firebasestorage.app",
  messagingSenderId: "323981884251",
  appId: "1:323981884251:web:c4085f4b40da0555d6f87e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;
