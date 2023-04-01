import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import Button from "../../Components/Button";
import Container from "../../Components/Container";
import dataBase from "../../firebase/config";
import { MyCamera } from "../../Components/Camera";

const initialPhotoInfo = {
  name: "",
  place: "",
};

export default function CreatePostsScreen() {
  const [photoInfo, setPhotoInfo] = useState(initialPhotoInfo);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();
  const { userId, login } = useSelector((state) => state.auth);

  const handleArrow = () => {
    navigation.navigate("PostsScreen");
  };

  // робити фото
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    let location = await Location.getCurrentPositionAsync({});
    setDisabledBtn(false);
    setPhoto(photo.uri);
    setLocation(location.coords);
  };

  // відправляти фото
  const sendPhoto = () => {
    const { name, place } = photoInfo;
    if (name.length < 3 || place.length < 3) {
      setErrorMessage("Text must be at least 3 characters long.");
    } else {
      setErrorMessage("");
      uploadPostToServer();
      navigation.navigate("DefaultScreensPosts", {
        photo,
        photoInfo,
        location,
      });
      Keyboard.dismiss(); // ховається клавіатура
      setPhotoInfo(initialPhotoInfo); // скидаємо форму
      setDisabledBtn(true);
      setPhoto("");
    }
  };

  const handleDelPost = () => {
    setPhoto("");
    setPhotoInfo(initialPhotoInfo);
    setDisabledBtn(true);
  };

  // обновляти фото
  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob(); // формат для загрузки файлів з бази даних
    const uniquePostId = Date.now().toString();

    await dataBase.storage().ref(`postImages/${uniquePostId}`).put(file); // в якому форматі і як зберігати фото
    const getPhoto = await dataBase
      .storage()
      .ref("postImages")
      .child(uniquePostId)
      .getDownloadURL();
    return getPhoto; //  firebase
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    try {
      const createPost = await dataBase
        .firestore()
        .collection("posts")
        .doc()
        .set({ photo, photoInfo, location, userId, login });
    } catch (error) {
      console.log(error);
      console.log(error.massage);
    }
  };

  return (
    <Container>
      <View style={styles.header}>
        <View style={styles.arrowBtn}>
          <AntDesign.Button
            name="arrowleft"
            size={24}
            color={"#BDBDBD"}
            backgroundColor={"transparent"}
            header={20}
            onPress={handleArrow}
          />
        </View>
        <Text>CreatePostsScreen</Text>
      </View>
      <View style={styles.wraper}>
        <MyCamera
          takePhoto={takePhoto}
          location={location}
          photo={photo}
          setCamera={setCamera}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.createPost}>
            <TextInput
              style={{ ...styles.title, ...styles.input }}
              keyboardType="default"
              placeholder="Name..."
              placeholderTextColor="#BDBDBD"
              onChangeText={(value) =>
                setPhotoInfo((prevState) => ({
                  ...prevState,
                  name: value,
                }))
              }
              value={photoInfo.name}
            />

            <View style={styles.location}>
              <Image
                style={styles.geolocation}
                source={require("../../assets/img/geolocation.png")}
              ></Image>

              <TextInput
                style={{ ...styles.title, ...styles.input, marginLeft: 32 }}
                keyboardType="default"
                placeholder="Place..."
                placeholderTextColor="#BDBDBD"
                onChangeText={(value) =>
                  setPhotoInfo((prevState) => ({
                    ...prevState,
                    place: value,
                  }))
                }
                value={photoInfo.place}
              />
            </View>
            <Button
              onSubmit={sendPhoto}
              text="Publish"
              disabledBtn={disabledBtn}
            />
            <TouchableOpacity style={styles.deletePost} onPress={handleDelPost}>
              <Image
                style={styles.delete}
                source={require("../../assets/img/deletePost.png")}
              ></Image>
            </TouchableOpacity>
            {errorMessage ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    paddingTop: 55,
    paddingBottom: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  arrowBtn: {
    position: "absolute",
    left: 16,
    bottom: 0,
  },
  wraper: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  createPost: {
    paddingTop: 16,
    gap: 16,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  deletePost: {
    alignItems: "center",
    marginTop: 16,
  },
  delete: {
    color: "#F6F6F6",
    width: 70,
    height: 40,
  },
  location: {
    position: "relative",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  geolocation: {
    position: "absolute",
    left: 0,
    bottom: 16,
    width: 24,
    height: 24,
    color: "#BDBDBD",
  },
});
