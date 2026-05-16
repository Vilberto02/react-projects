import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { ChartNoAxesGantt, Form, Code } from "lucide-react-native";

// Importar las pantallas
import PaginationScreen from "./screens/PaginationScreen";
import NavigationAppScreen from "./screens/NavigationAppScreen";
import EffectScreen from "./screens/EffectScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Paginación"
          component={PaginationScreen}
          options={{
            title: "Paginación Infinita",
            tabBarIcon: () => <Form />,
          }}
        />
        <Tab.Screen
          name="Navegación"
          component={NavigationAppScreen}
          options={{
            title: "Formas Navegación",
            headerShown: false, // El Drawer ya tiene su propio header
            tabBarIcon: () => <ChartNoAxesGantt />,
          }}
        />
        <Tab.Screen
          name="Efecto"
          component={EffectScreen}
          options={{ title: "Uso Effect", tabBarIcon: () => <Code /> }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
