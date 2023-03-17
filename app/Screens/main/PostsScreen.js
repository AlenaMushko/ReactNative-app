import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Container from "../../Components/Container";

import AntDesign from '@expo/vector-icons/AntDesign';


export default function PostsScreen() {
  return (
    <Container>
      <View style={styles.header}>
      <View style={styles.logout}>
     <AntDesign.Button name="logout" color={"#BDBDBD"} backgroundColor={"transparent"}
    //  onPress={loginWithFacebook}
     >
      </AntDesign.Button>
      </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    fontFamily: "Roboto_Medium",
    fontSize:17,
    lineHeight: 22,
    color: "#212121",
    overflow:'visible',
  },
  logout:{
    flex: 1,
    position:"absolute",
    top:-10,
    right:10,
  }
});
