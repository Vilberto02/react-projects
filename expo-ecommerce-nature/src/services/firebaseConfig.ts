// src/services/firebaseConfig.ts
// ============================================
// CONFIGURACIÓN DE FIREBASE
// Sesión 11: Integración de Firebase
// Auth + Firestore + Storage
// ============================================

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// @ts-ignore
import { getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ── Auth con persistencia en AsyncStorage ──
// Esto mantiene la sesión del usuario entre cierres de la app
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// ── Firestore (Base de datos) ──
const db = getFirestore(app);

// ── Storage (Almacenamiento de archivos) ──
const storage = getStorage(app);

export { app, auth, db, storage };
export default app;
