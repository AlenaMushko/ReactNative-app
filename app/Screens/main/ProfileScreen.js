import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AddUserIcon from "../../assets/svg/addUserIcon";
import Container from "../../Components/Container";
import { authSignOutUser } from "../redux/auth/authOperations";
import dataBase from "../../firebase/config";

export default function ProfileScreen({ route }) {
  const [post, setPost] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch(); //створюємо портал

  useEffect(() => {
    if (route.params) {
      setPost((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const handleSignOut = () => {
    dispatch(authSignOutUser());
  };

  const userLogin = dataBase.auth().currentUser.displayName;
  const userPhoto = dataBase.auth().currentUser.photoURL;

  return (
    <Container>
      <ImageBackground
        style={styles.imgBg}
        source={require("../../assets/img/BGbgMountains.png")}
      >
        <View style={styles.box}>
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

          <View style={styles.logoutBtn}>
            <AntDesign.Button
              name="logout"
              size={24}
              color={"#BDBDBD"}
              backgroundColor={"transparent"}
              header={20}
              onPress={handleSignOut}
            />
          </View>
          <Text style={styles.title}>{userLogin}</Text>
        </View>
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
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    //   justifyContent: "center",
    position: "relative",
    marginTop: 147,
  },
  userPhoto: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: -60,
  },
  addPhoto: {
    position: "absolute",
    right: -13,
    bottom: 20,
  },
  logoutBtn: {
    position: "absolute",
    right: 0,
    top: 22,
  },
  title: {
    fontFamily: "Roboto_Medium",
    fontSize: 30,
    letterSpacing: 0.01,
    lineHeight: 35,
    marginTop: 92,
  },
});
