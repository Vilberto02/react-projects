import { Tabs } from "expo-router";
import {
  AlarmClock,
  Clock,
  EllipsisVertical,
  Hourglass,
  Timer,
} from "lucide-react-native";
import React, { createContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export const ClockSettingsContext = createContext({
  clockScale: 1,
  setClockScale: (val: number) => {},
  showUI: true,
  setShowUI: (val: boolean) => {},
});

export default function TabLayout() {
  const [clockScale, setClockScale] = useState(1);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [showUI, setShowUI] = useState(true);

  return (
    <ClockSettingsContext.Provider
      value={{ clockScale, setClockScale, showUI, setShowUI }}
    >
      <Tabs
        screenOptions={{
          headerShown: showUI,
          headerStyle: {
            backgroundColor: "#000000",
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitle: "",
          headerLeft: () => (
            <Text
              style={{
                color: "#ffffff",
                fontFamily: "BricolageGrotesque_600SemiBold",
                fontSize: 20,
                letterSpacing: -0.5,
                paddingLeft: 24,
              }}
            >
              CHRONOS
            </Text>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => setSettingsVisible(true)}
              style={{ paddingRight: 24 }}
            >
              <EllipsisVertical color="#ffffff" size={24} />
            </Pressable>
          ),
          tabBarStyle: {
            display: showUI ? "flex" : "none",
            backgroundColor: "#030303", // Deep Black
            borderTopWidth: 1,
            borderTopColor: "#27272a", // Border Dark
            paddingTop: 8,
            paddingBottom: 24, // Safe area approx
            height: 96,
          },
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#767d88", // Cool Slate
          tabBarLabelStyle: {
            fontFamily: "Inter_600SemiBold", // basier-square equivalent
            fontSize: 11,
            marginTop: 8,
            letterSpacing: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "RELOJ",
            tabBarIcon: ({ color }) => <Clock color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="alarm"
          options={{
            title: "ALARMA",
            tabBarIcon: ({ color }) => <AlarmClock color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="timer"
          options={{
            title: "POMODORO",
            tabBarIcon: ({ color }) => <Hourglass color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="stopwatch"
          options={{
            title: "CRONOMETRO",
            tabBarIcon: ({ color }) => <Timer color={color} size={24} />,
          }}
        />
      </Tabs>

      {/* Settings Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={settingsVisible}
        onRequestClose={() => setSettingsVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSettingsVisible(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalTitle}>CONFIGURACIÓN</Text>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>TAMAÑO DEL RELOJ</Text>
              <View style={styles.controlsRow}>
                <Pressable
                  style={styles.controlButton}
                  onPress={() => setClockScale(Math.max(0.5, clockScale - 0.1))}
                >
                  <Text style={styles.controlIconText}>-</Text>
                </Pressable>
                <Text style={styles.scaleText}>
                  {Math.round(clockScale * 100)}%
                </Text>
                <Pressable
                  style={styles.controlButton}
                  onPress={() => setClockScale(Math.min(2.0, clockScale + 0.1))}
                >
                  <Text style={styles.controlIconText}>+</Text>
                </Pressable>
              </View>
            </View>

            <Pressable
              style={styles.closeButton}
              onPress={() => setSettingsVisible(false)}
            >
              <Text style={styles.closeButtonText}>CERRAR</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </ClockSettingsContext.Provider>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1a1a1a", // Dark Surface
    width: "80%",
    maxWidth: 400,
    borderRadius: 16, // Generous radius from DESIGN.md
    padding: 24,
    borderWidth: 1,
    borderColor: "#27272a", // Border Dark
  },
  modalTitle: {
    color: "#ffffff",
    fontFamily: "BricolageGrotesque_600SemiBold",
    fontSize: 16,
    letterSpacing: -0.3,
    marginBottom: 24,
    textAlign: "center",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  settingLabel: {
    color: "#767d88",
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    letterSpacing: -0.35,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  controlButton: {
    backgroundColor: "#27272a",
    borderRadius: 8,
    padding: 8,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  controlIconText: {
    color: "#ffffff",
    fontSize: 20,
    lineHeight: 20,
    fontFamily: "Inter_600SemiBold",
  },
  scaleText: {
    color: "#ffffff",
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    minWidth: 48,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#27272a",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    letterSpacing: 0,
  },
});
