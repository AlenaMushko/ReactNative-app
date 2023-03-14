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

const initialState = {
  login: "",
  email: "",
  password: "",
};

const initialFocus = {
  login: false,
  email: false,
  password: false,
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [isFocus, setIsFocus] = useState(initialFocus);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [fontsLoader] = useFonts({
    Roboto_Regular: require("../assets/fonts/Roboto-Regular.ttf"),
    Roboto_Medium: require("../assets/fonts/Roboto-Medium.ttf"),
    Roboto_Bold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

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
      <View style={styles.container}>
        <ImageBackground
          style={styles.imgBg}
          source={require("../assets/img/BGbgMountains.png")}
        >
          <View style={styles.box}>
            <View style={styles.userPhoto}>
              <TouchableOpacity style={styles.addPhoto}><Text style={styles.add}>+</Text></TouchableOpacity>
            </View>
            <Text style={styles.title}>Registration</Text>
            <View style={styles.form}>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocus.login ? "#FF6C00" : "#E8E8E8",
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  value={state.login}
                  placeholder="login"
                  keyboardType="default"
                  onFocus={() => setIsFocus(true)}
                />
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocus.password ? "#FF6C00" : "#E8E8E8",
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  value={state.email}
                  placeholder="email address"
                  keyboardType="email-address"
                  onFocus={() => setIsFocus(true)}
                />
                <View style={styles.inputPassword}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocus.password ? "#FF6C00" : "#E8E8E8",
                    }}
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
                    onFocus={() => setIsFocus(true)}
                  />

                  <Text
                    style={styles.show}
                    onPress={() => setIsShowPassword((prev) => !prev)}
                  >
                    show
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  //  onPress={onPress}
                >
                  <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
                <Text style={styles.inAccount}>Already have an account? Log in</Text>
              </KeyboardAvoidingView>
            </View>
          </View>
        </ImageBackground>
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
  imgBg: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  box: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    position:"relative",
  },
  title: {
    fontFamily: "Roboto_Medium",
    fontSize: 30,
    letterSpacing: 0.01,
    lineHeight: 35,
    marginTop: 92,
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
    // borderColor: "#E8E8E8",
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 8,
    paddingLeft: 16,
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
  inAccount:{
    color:"#1B4371",
    fontSize: 16,
    lineHeight: 19,
   textAlign: "center",
   marginTop:16,
  },
  userPhoto:{
    position:"absolute",
    width:120,
    height:120,
    backgroundColor:"#F6F6F6",
    borderRadius:16,
    top:-60,
  },
  addPhoto:{
  
    position:"absolute",
    color:"#FF6C00",
    width:25,
    borderColor:"#FF6C00",
    borderRadius:"50",
    borderWidth:1,
    right:-10,
    bottom:10,
  }
});
