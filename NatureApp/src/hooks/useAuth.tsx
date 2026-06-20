// src/hooks/useAuth.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { AuthAPI, clearToken, setToken } from "../services/apiService";
import { User } from "../types/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Restaurar sesión al iniciar
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        if (token) {
          setToken(token);
          const res = await AuthAPI.getProfile();
          setUser(res.data || null);
        }
      } catch (err: any) {
        await AsyncStorage.removeItem("auth_token");
        clearToken();
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  // Iniciar sesión
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AuthAPI.login(email, password);
      if (res.data) {
        await AsyncStorage.setItem("auth_token", res.data.token);
        setToken(res.data.token);
        const loggedUser = { ...res.data.user, _id: res.data.user.id };
        setUser(loggedUser);
        return res.data;
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Registrarse
  const register = useCallback(async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AuthAPI.register(userData);
      if (res.data) {
        await AsyncStorage.setItem("auth_token", res.data.token);
        setToken(res.data.token);
        const loggedUser = { ...res.data.user, _id: res.data.user.id };
        setUser(loggedUser);
        return res.data;
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cerrar sesión
  const logout = useCallback(async () => {
    await AsyncStorage.removeItem("auth_token");
    clearToken();
    setUser(null);
  }, []);

  return { user, loading, error, login, register, logout };
}
