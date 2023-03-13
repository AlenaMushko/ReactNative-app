import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";



export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgBg}
        source={require('../assets/img/BGbgMountains.png')} 
      >
        <View>
        <Text style={styles.text}>Hello mentor.</Text>
        </View>

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    marginHorizontal: 60,
    color: "#90ee90",
    fontSize: 32,
  },
  imgBg: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
