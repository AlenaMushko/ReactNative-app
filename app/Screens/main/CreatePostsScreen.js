import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { useKeyboard } from "@react-native-community/hooks";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import Button from "../../Components/Button";
import Container from "../../Components/Container";
import { TouchableOpacity } from "react-native-gesture-handler";
import dataBase from "../../firebase/config";

const initialPhotoInfo = {
  name: "",
  place: "",
};

export default function CreatePostsScreen() {
  const [photoInfo, setPhotoInfo] = useState(initialPhotoInfo);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const navigation = useNavigation();
  const { userId, login } = useSelector((state) => state.auth);

  // щоб отримати дозвіл від користувача
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const handleArrow = () => {
    navigation.navigate("PostsScreen");
  };

  const handleCameraReady = () => {
    console.log("Camera is ready!");
    // Now you can access the camera
  };

  // робити фото
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    let location = await Location.getCurrentPositionAsync({});
    setDisabledBtn(false);
    setPhoto(photo.uri);
    setLocation(location.coords);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // вибираємо камеру
  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  // відправляти фото
  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreensPosts", { photo, photoInfo, location });
    Keyboard.dismiss(); // ховається клавіатура
    setPhotoInfo(initialPhotoInfo); // скидаємо форму
    setDisabledBtn(true);
    setPhoto("");
  };

  const handleDelPost = () => {
    setPhoto("");
    setPhotoInfo(null);
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
     .set({ photo, photoInfo, location, userId, login});
    } catch (error) {
      console.log(error);
      console.log(error.massage);
    }
  };

  const keyboard = useKeyboard();

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
        {!keyboard.keyboardShown && (
          <>
            <Camera
              style={styles.camera}
              onCameraReady={handleCameraReady}
              ref={setCamera}
              type={cameraType}
            >
              {photo && (
                <View style={styles.photo}>
                  <Image
                    source={{ uri: photo }}
                    style={{ width: 130, height: 130 }}
                  />
                </View>
              )}
              <TouchableOpacity
                style={styles.snapContainer}
                onPress={takePhoto}
              >
                <View>
                  <Image
                    style={styles.addPhoto}
                    source={require("../../assets/img/addPhoto.png")}
                  ></Image>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: "transparent",
                  padding: 50,
                }}
              >
                <TouchableOpacity onPress={handleCameraType}>
                  <Text style={styles.flip}>Flip camera</Text>
                </TouchableOpacity>
              </View>
            </Camera>
            <Text style={{ ...styles.title, marginTop: 8 }}>
              Download photo
            </Text>
          </>
        )}

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
            <View style={styles.deletePost} onPress={handleDelPost}>
              <Image
                style={styles.delete}
                source={require("../../assets/img/deletePost.png")}
                onPress={handleDelPost}
              ></Image>
            </View>
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
  title: {
    fontFamily: "Roboto_Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
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
  addPhoto: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  camera: {
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    alignItems: "center",
  },
  snapContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  flip: {
    fontSize: 24,
    marginBottom: 10,
    color: "#FFFFFF",
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
  photo: {
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
});
