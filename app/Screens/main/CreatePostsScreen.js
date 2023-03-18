import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import Container from "../../Components/Container";


export default function CreatePostsScreen() {

  return (
    <Container>
       <View style={styles.container}><Text>CreatePostsScreen</Text></View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
      fontFamily: "Roboto_Regular",
      alignItems: "center",
      justifyContent:"center",
    },
});