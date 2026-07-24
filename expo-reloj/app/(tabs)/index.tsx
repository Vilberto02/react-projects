import { useKeepAwake } from "expo-keep-awake";
import * as ScreenOrientation from "expo-screen-orientation";
import { Lock, RotateCcw } from "lucide-react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { ClockSettingsContext } from "./_layout";

export default function ClockScreen() {
  useKeepAwake(); // Keep the screen on

  const [time, setTime] = useState(new Date());
  const { clockScale, showUI, setShowUI } = useContext(ClockSettingsContext);
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    return `${days[date.getDay()]} • ${months[date.getMonth()]} ${date.getDate()}`;
  };

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

  // Responsive font sizes
  const baseTimeSize = isLandscape ? height * 0.45 : width * 0.35;
  const timeFontSize = baseTimeSize * clockScale;
  const dateFontSize = isLandscape ? height * 0.04 : width * 0.035;

  return (
    <>
      <View style={styles.container}>
        {/* Main Clock Area */}
        <View style={styles.clockContainer}>
          <Text style={[styles.timeText, { fontSize: timeFontSize }]}>
            {formatTime(time)}
          </Text>
          {showUI && (
            <Text style={[styles.dateText, { fontSize: dateFontSize }]}>
              {formatDate(time)}
            </Text>
          )}
        </View>

        {/* Floating Controls */}
        <>
          <Pressable
            style={styles.floatingButtonLeft}
            onPress={(e) => {
              e.stopPropagation();
              handleRotate();
            }}
          >
            <RotateCcw color="#ffffff" size={24} />
          </Pressable>
          <Pressable
            style={styles.floatingButtonRight}
            onPress={(e) => {
              e.stopPropagation();
              toggleUI();
            }}
          >
            <Lock color="#ffffff" size={24} />
          </Pressable>
        </>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "space-between",
  },

  clockContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    color: "#ffffff",
    fontFamily: "BricolageGrotesque_700Bold",
    fontVariant: ["tabular-nums"],
    lineHeight: undefined,
    includeFontPadding: false,
    letterSpacing: -3, // display-xxl spacing
  },
  dateText: {
    color: "#767d88", // Cool Slate
    fontFamily: "Inter_600SemiBold", // basier-square equivalent
    letterSpacing: -0.35, // caption-tight spacing
    marginTop: 20,
    textTransform: "uppercase",
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
});
