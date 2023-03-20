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

import Button from "../../Components/Button";
import Container from "../../Components/Container";
import { TouchableOpacity } from "react-native-gesture-handler";

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

  const navigation = useNavigation();

  // щоб отримати дозвіл від користувача
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
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

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    setPhoto(photo.uri);
  };

  let text = 'Waiting..';
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
  const sendPhoto = async () => {
    navigation.navigate("PostsScreen", { photo, photoInfo, location });
    Keyboard.dismiss(); // ховається клавіатура
    setPhotoInfo(initialPhotoInfo); // скидаємо форму
    setPhoto("");
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

            <Button onSubmit={sendPhoto} text="Publish" />
            <View style={styles.deletePost}>
              <Image
                style={styles.delete}
                source={require("../../assets/img/deletePost.png")}
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
