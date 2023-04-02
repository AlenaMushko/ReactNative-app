import React, { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StyleSheet,
} from "react-native";

export default function Container({ children }) {
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [fontsLoader] = useFonts({
    Roboto_Regular: require("../assets/fonts/Roboto-Regular.ttf"),
    Roboto_Medium: require("../assets/fonts/Roboto-Medium.ttf"),
    Roboto_Bold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    const screen = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window.width);
    });
    return () => screen?.remove();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoader) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoader]);

  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto_Regular: require("../assets/fonts/Roboto-Regular.ttf"),
        Roboto_Medium: require("../assets/fonts/Roboto-Medium.ttf"),
        Roboto_Bold: require("../assets/fonts/Roboto-Bold.ttf"),
      }))();
  }, []);

  if (!fontsLoader) {
    return undefined;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{ ...styles.container, width: dimensions }}
        onLayout={onLayoutRootView}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Roboto_Regular",
  },
});
