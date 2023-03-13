import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";



export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/img/Photo BGbgMountains.png')} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Hello mentor.</Text>

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginHorizontal: 60,
    color: "#90ee90",
    fontSize: 32,
  },
});
