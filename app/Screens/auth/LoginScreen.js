import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Container from "../../Components/Container";
import Button from "../../Components/Button";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../redux/auth/authOperations";

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
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleFocus = (inputValue) => {
    setIsActive(true);
    setDisabledBtn(false);
    setIsFocus((prevState) => ({ ...prevState, [inputValue]: true }));
  };

  const handleEndEditing = (inputValue) => {
    setIsActive(false);
    setIsFocus((prevState) => ({ ...prevState, [inputValue]: false }));
  };

  const handleGoToRegister = () => {
    navigation.navigate("registration");
  };



  const handleSubmit = async () => {
    const { email, password } = state;

    const regularEmail = /^[a-zA-Z@.]*$/;
    const regularPassword = /^\d{6,15}$/;

    const emailTest = await email;
    const paswordTest = await password;
console.log(regularEmail.test(emailTest));
console.log(regularPassword.test(paswordTest));
    if (regularEmail.test(emailTest) && regularPassword.test(paswordTest)) {
     console.log("ok 1");
      setErrorMessage("");
      navigation.navigate("home");
      setIsActive(false); // margin стає на початкове значення
      Keyboard.dismiss(); // ховається клавіатура
      dispatch(authSignInUser(state));
      setState(initialState); // скидаємо форму
      setDisabledBtn(true);
      console.log("ok 2");
    } else {
      setErrorMessage("  Email must contain @, Password must contain only numbers, and have length from 6 to 15");
    }
  };

  return (
    <Container>
      <ImageBackground
        style={styles.imgBg}
        source={require("../../assets/img/BGbgMountains.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={{ ...styles.box, paddingBottom: isActive ? 32 : 132 }}>
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
                  setState((prevState) => ({
                    ...prevState,
                    email: value.trim().toLowerCase(),
                  }))
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
                  {errorMessage ? (
              <Text style={{color:"#ff0000"}}>{errorMessage}</Text>
            ) : null}
                  <Button
                    onSubmit={handleSubmit}
                    text="Log In"
                    disabledBtn={disabledBtn}
                  />
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
    paddingHorizontal: 16,
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
