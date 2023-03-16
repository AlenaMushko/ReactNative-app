import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Container from "../assets/Components/Container";

const initialState = {
  email: "",
  password: "",
};

const initialIsFocus = {
  email: false,
  password: false,
};

export default function LoginScreen() {
  const [state, setState] = useState(initialState);
  const [isFocus, setIsFocus] = useState(initialIsFocus);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigation = useNavigation();

  const handleFocus = (inputValue) => {
    setIsActive(true);
    setIsFocus((prevState) => ({ ...prevState, [inputValue]: true }));
  };

  const handleEndEditing = (inputValue) => {
    setIsActive(false);
    console.log("EndEditing", inputValue);
    setIsFocus((prevState) => ({ ...prevState, [inputValue]: false }));
  };
console.log("isFocus.email", isFocus.email);
  const keyboardHidden = () => {
    setIsFocus(false); // margin стає на початкове значення
    Keyboard.dismiss(); // ховається клавіатура
    setState(initialState); // скидаємо форму
  };

  const handleGoToRegister = () => {
    navigation.navigate("registration");
  };
  
  return (
    <Container>
        <ImageBackground
          style={styles.imgBg}
          source={require("../assets/img/BGbgMountains.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{ ...styles.box, paddingBottom: isActive ? 32 : 132 }}
              onFocus={() => setIsFocus(true)}
              onEndEditing={() => setIsFocus(false)}
            >
              <Text style={styles.title}>Log In</Text>
              <View style={styles.form}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocus.email ? "#FF6C00" : "#E8E8E8",
                  }}
                  
                  onFocus={() => handleFocus("email")}
                  onEndEditing={() => handleEndEditing("email")}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  value={state.email}
                  placeholder="email address"
                  keyboardType="email-address"
                />
                <View style={styles.inputPassword}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocus.password ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => handleFocus("password")}
                    onEndEditing={() => handleEndEditing("password")}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value.trim(),
                      }))
                    }
                    value={state.password}
                    placeholder="password"
                    keyboardType="numeric"
                    secureTextEntry={!isShowPassword}
                  />
                  {isShowPassword === true ? (
                    <Text
                      style={styles.show}
                      onPress={() => setIsShowPassword((prev) => !prev)}
                    >
                      Hide
                    </Text>
                  ) : (
                    <Text
                      style={styles.show}
                      onPress={() => setIsShowPassword((prev) => !prev)}
                    >
                      Show
                    </Text>
                  )}
                </View>

                {!isActive && (
                  <View>
                    <TouchableOpacity
                      style={styles.button}
                      activeOpacity
                      onPress={keyboardHidden}
                    >
                      <Text style={styles.btnText}>Log In</Text>
                    </TouchableOpacity>
                    <Text style={styles.inAccount} onPress={handleGoToRegister}>
                      Don't have an account? Register
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
     </Container>
  );
}

const styles = StyleSheet.create({
  imgBg: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  box: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontFamily: "Roboto_Medium",
    fontSize: 30,
    letterSpacing: 0.01,
    lineHeight: 35,
    marginTop: 32,
  },
  form: {
    marginTop: 33,
    gap: 16,
  },
  input: {
    color: "#212121",
    placeholderTextColor: "#BDBDBD",
    marginHorizontal: 16,
    height: 50,
    width: 343,
    padding: 10,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 8,
    paddingLeft: 16,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  inputPassword: {
    position: "relative",
  },
  show: {
    position: "absolute",
    right: 32,
    top: 15,
  },
  button: {
    marginTop: 43,
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    padding: 16,
    alignItems: "center",
    borderRadius: 100,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
  inAccount: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 16,
  },
  userPhoto: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: -60,
  },
});
