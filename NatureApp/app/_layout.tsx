import { Stack } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../src/store/authStore";

export default function RootLayout() {
  const initAuthListener = useAuthStore((state) => state.initAuthListener);

  useEffect(() => {
    const unsubscribe = initAuthListener();
    return () => unsubscribe();
  }, [initAuthListener]);

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1A5276" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: "Detalle del Producto",
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="auth/login"
          options={{
            title: "Iniciar Sesión",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="auth/register"
          options={{
            title: "Registrarse",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="checkout"
          options={{
            title: "Finalizar Compra",
          }}
        />
      </Stack>
    </>
  );
}
