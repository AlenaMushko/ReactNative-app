import * as Location from "expo-location";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from "react-native";
  import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { useKeyboard } from "@react-native-community/hooks";


export const MyCamera = ({takePhoto, location, photo, setCamera}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [errorMsg, setErrorMsg] = useState(null);

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

  const handleCameraReady = () => {
    console.log("Camera is ready!");
    // Now you can access the camera
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

  const keyboard = useKeyboard();

  return (
    <>
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
            <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
              <View>
                <Image
                  style={styles.addPhoto}
                  source={require("../assets/img/addPhoto.png")}
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
          <Text style={{ ...styles.title, marginTop: 8 }}>Download photo</Text>
        </>
      )}
    </>
  );
};



const styles = StyleSheet.create({
    camera: {
        height: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        alignItems: "center",
      },
      photo: {
        position: "absolute",
        top: 0,
        left: 0,
        borderWidth: 1,
        borderColor: "#E8E8E8",
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
    addPhoto: {
        width: 60,
        height: 60,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
      },
      flip: {
        fontSize: 24,
        marginBottom: 10,
        color: "#FFFFFF",
      },
  });
  