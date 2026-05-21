import * as ScreenOrientation from "expo-screen-orientation";
import {
  Lock,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Settings,
} from "lucide-react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { ClockSettingsContext } from "./_layout";

export default function TimerScreen() {
  const { clockScale, showUI, setShowUI } = useContext(ClockSettingsContext);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const baseTimeSize = isLandscape ? height * 0.45 : width * 0.35;
  const timeFontSize = baseTimeSize * clockScale;

  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [tempWorkTime, setTempWorkTime] = useState("25");
  const [tempBreakTime, setTempBreakTime] = useState("5");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (isWorkMode) {
        setIsWorkMode(false);
        setTimeLeft(breakTime * 60);
      } else {
        setIsWorkMode(true);
        setTimeLeft(workTime * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isWorkMode, workTime, breakTime]);

  useEffect(() => {
    setTimeLeft(isWorkMode ? workTime * 60 : breakTime * 60);
  }, [workTime, breakTime, isWorkMode]);

  const handleRotate = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    if (
      orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    ) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
      );
    }
  };

  const toggleUI = () => setShowUI(!showUI);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isWorkMode ? workTime * 60 : breakTime * 60);
  };

  const saveSettings = () => {
    const wt = parseInt(tempWorkTime, 10);
    const bt = parseInt(tempBreakTime, 10);
    if (!isNaN(wt) && wt > 0) setWorkTime(wt);
    if (!isNaN(bt) && bt > 0) setBreakTime(bt);

    setIsActive(false);
    setIsWorkMode(true);
    setTimeLeft((isNaN(wt) || wt <= 0 ? workTime : wt) * 60);
    setIsEditing(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.statusText}>
          {isWorkMode ? "Concentración" : "Descanso"}
        </Text>

        <Text style={[styles.timeText, { fontSize: timeFontSize, lineHeight: undefined }]}>{formatTime(timeLeft)}</Text>

        {showUI && (
          <View style={styles.controls}>
            <Pressable style={styles.secondaryButton} onPress={resetTimer}>
              <RefreshCw color="#ffffff" size={24} />
            </Pressable>

            <Pressable style={styles.controlButton} onPress={toggleTimer}>
              {isActive ? (
                <Pause color="#ffffff" size={32} />
              ) : (
                <Play color="#ffffff" size={32} fill="#ffffff" />
              )}
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={() => setIsEditing(true)}
            >
              <Settings color="#ffffff" size={24} />
            </Pressable>
          </View>
        )}
      </View>

      {showUI && (
        <Pressable
          style={styles.floatingButtonLeft}
          onPress={(e) => {
            e.stopPropagation();
            handleRotate();
          }}
        >
          <RotateCcw color="#ffffff" size={24} />
        </Pressable>
      )}

      <Pressable
        style={[
          styles.floatingButtonRight,
          !showUI && {
            backgroundColor: "transparent",
            borderColor: "transparent",
          },
        ]}
        onPress={(e) => {
          e.stopPropagation();
          toggleUI();
        }}
      >
        <Lock color={showUI ? "#ffffff" : "#767d88"} size={24} />
      </Pressable>

      <Modal
        visible={isEditing}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsEditing(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setIsEditing(false)}
          >
            <Pressable
              style={styles.modalContent}
              onPress={(e) => e.stopPropagation()}
            >
              <Text style={styles.modalTitle}>CONFIGURACIÓN</Text>

              <Text style={styles.inputLabel}>CONCENTRACIÓN (MIN)</Text>
              <TextInput
                style={styles.input}
                value={tempWorkTime}
                onChangeText={setTempWorkTime}
                keyboardType="numeric"
                maxLength={3}
              />

              <Text style={styles.inputLabel}>DESCANSO (MIN)</Text>
              <TextInput
                style={styles.input}
                value={tempBreakTime}
                onChangeText={setTempBreakTime}
                keyboardType="numeric"
                maxLength={3}
              />

              <Pressable style={styles.closeButton} onPress={saveSettings}>
                <Text style={styles.closeButtonText}>GUARDAR</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  statusText: {
    color: "#767d88",
    fontFamily: "Inter_600SemiBold",
    fontSize: 24,
    marginBottom: 20,
    textTransform: "uppercase",
    letterSpacing: -0.35,
  },
  timeText: {
    color: "#ffffff",
    fontFamily: "BricolageGrotesque_700Bold",
    fontVariant: ["tabular-nums"],
    includeFontPadding: false,
    letterSpacing: -3,
    marginBottom: 32,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  controlButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272a",
  },
  secondaryButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonLeft: {
    position: "absolute",
    bottom: 24,
    left: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272a",
  },
  floatingButtonRight: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272a",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    width: "80%",
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  modalTitle: {
    color: "#ffffff",
    fontFamily: "BricolageGrotesque_600SemiBold",
    fontSize: 16,
    letterSpacing: -0.3,
    marginBottom: 24,
    textAlign: "center",
  },
  inputLabel: {
    color: "#767d88",
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    letterSpacing: -0.35,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#27272a",
    color: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 48,
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 24,
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
