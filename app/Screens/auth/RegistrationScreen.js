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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AddUserIcon from "../../assets/svg/addUserIcon";
import Container from "../../Components/Container";
import Button from "../../Components/Button";
import { authSignUpUser } from "../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const initialIsFocus = {
  login: false,
  email: false,
  password: false,
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [isFocus, setIsFocus] = useState(initialIsFocus);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleFocus = (inputValue) => {
    setIsActive(true);
    setIsFocus((prevState) => ({ ...prevState, [inputValue]: true }));
  };

  const handleEndEditing = (inputValue) => {
    setIsActive(false);
    setIsFocus((prevState) => ({ ...prevState, [inputValue]: false }));
  };

  const handleSubmit = async () => {
    const { login, email, password } = state;

    if (!login || !email || !password) {
      showToast();
      return;
    } //!
    navigation.navigate("home");
    // navigation.navigate("home", {
    //   screen: 'PostsScreen',
    //   params: { state },
    // });
    setIsActive(false); // margin стає на початкове значення
    Keyboard.dismiss(); // ховається клавіатура
    dispatch(authSignUpUser(state))
    setState(initialState); // скидаємо форму
  };

  const handleGoToLogin = () => {
    navigation.navigate("login");
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
          <View style={{ ...styles.box, paddingBottom: isActive ? 32 : 78 }}>
            {isActive === true ? (
              <View style={styles.userPhoto}>
                <ImageBackground
                  style={styles.imgBg}
                  source={require("../../assets/img/user.png")}
                >
                  <AddUserIcon
                    style={styles.addPhoto}
                    fill={"#E8E8E8"}
                    stroke={"#E8E8E8"}
                  />
                </ImageBackground>
              </View>
            ) : (
              <View style={styles.userPhoto}>
                <AddUserIcon
                  style={styles.addPhoto}
                  fill={"#FF6C00"}
                  stroke={"#FF6C00"}
                />
              </View>
            )}

            <Text style={styles.title}>Registration</Text>
            <View style={styles.form}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFocus.login ? "#FF6C00" : "#E8E8E8",
                }}
                onFocus={() => handleFocus("login")}
                onEndEditing={() => handleEndEditing("login")}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    login: value.trim(),
                  }))
                }
                value={state.login}
                placeholder="login"
                keyboardType="default"
              />
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
                  <Button onSubmit={handleSubmit} text="Register" />
                  <Text style={styles.inAccount} onPress={handleGoToLogin}>
                    Already have an account? Log in
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
  addPhoto: {
    position: "absolute",
    right: -13,
    bottom: 20,
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
