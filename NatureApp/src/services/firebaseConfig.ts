// src/services/firebaseConfig.ts
// ============================================
// CONFIGURACIÓN DE FIREBASE
// Sesión 11: Integración de Firebase
// Auth + Firestore + Storage
// ============================================

import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// @ts-ignore
import { getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2_qViI0NaRo3SlzOYKcOfzLtI9XqPulc",
  authDomain: "nature-app-5014e.firebaseapp.com",
  projectId: "nature-app-5014e",
  storageBucket: "nature-app-5014e.firebasestorage.app",
  messagingSenderId: "347274268132",
  appId: "1:347274268132:web:fc9992bb4e710a2b30cbf1",
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
