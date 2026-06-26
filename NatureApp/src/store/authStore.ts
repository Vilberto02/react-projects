// src/store/authStore.ts
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "../services/firebaseConfig";
import { User } from "../types/types";
import { useCartStore } from "./cartStore";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  login: (email: string, pass: string) => Promise<any>;
  register: (data: any) => Promise<any>;
  logout: () => Promise<void>;
  initAuthListener: () => () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  error: null,
  initialized: false,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      set({ loading: false });
      return result.user;
    } catch (err: any) {
      let message = "Error de inicio de sesión";
      if (err.code === "auth/user-not-found")
        message = "No existe una cuenta con este email";
      else if (err.code === "auth/wrong-password")
        message = "Contraseña incorrecta";
      else if (err.code === "auth/invalid-email") message = "Email inválido";

      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      await updateProfile(result.user, { displayName: userData.name });
      await setDoc(doc(db, "users", result.user.uid), {
        name: userData.name,
        email: userData.email,
        phone: userData.phone || "",
        role: "customer",
        createdAt: new Date().toISOString(),
      });
      set({ loading: false });
      return result.user;
    } catch (err: any) {
      let message = "Error de registro";
      if (err.code === "auth/email-already-in-use")
        message = "Este email ya está registrado";
      else if (err.code === "auth/weak-password")
        message = "La contraseña es muy débil";

      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
      useCartStore.getState().clearCartLocal();
    } catch (err) {
      set({ user: null });
    }
  },

  initAuthListener: () => {
    // Avoid multiple listeners
    if (get().initialized) return () => {};

    set({ initialized: true });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      set({ loading: true });
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          const userData = userDoc.exists() ? userDoc.data() : {};
          const userObj = {
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || userData.name || "Usuario",
            phone: userData.phone || "",
            role: userData.role || "customer",
            photoURL: firebaseUser.photoURL || userData.photoURL || null,
          };
          set({ user: userObj, loading: false });
          // Load cart when user logs in
          useCartStore.getState().loadCart(firebaseUser.uid);
        } catch (err) {
          set({
            user: {
              id: firebaseUser.uid,
              email: firebaseUser.email || "",
              name: firebaseUser.displayName || "Usuario",
              role: "customer",
            },
            loading: false,
          });
        }
      } else {
        set({ user: null, loading: false });
        useCartStore.getState().clearCartLocal();
      }
    });

    return unsubscribe;
  },
}));
