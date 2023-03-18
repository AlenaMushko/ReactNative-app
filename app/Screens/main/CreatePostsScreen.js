import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Button from "../../Components/Button";
import Container from "../../Components/Container";

export default function CreatePostsScreen() {
  const navigation = useNavigation();
  const handleArrow = () => {
    navigation.navigate("registration");
  };
  return (
    <Container>
      <View style={styles.header}>
        <View style={styles.arrowBtn}>
          <AntDesign.Button
            name="arrowleft"
            color={"#BDBDBD"}
            backgroundColor={"transparent"}
            header={20}
            onPress={handleArrow}
          />
        </View>
        <Text>CreatePostsScreen</Text>
      </View>
      <View style={styles.wraper}>
        <View style={styles.boxPhoto}>
          <Image
            style={styles.addPhoto}
            source={require("../../assets/img/addPhoto.png")}
          ></Image>
        </View>
        <Text style={{ ...styles.title, marginTop: 8 }}>Download photo</Text>
        <View style={styles.createPost}>
          <TextInput
            style={{ ...styles.title, ...styles.input }}
            keyboardType="default"
            placeholder="Name..."
            placeholderTextColor="#BDBDBD"
          />
          <TextInput
            style={{ ...styles.title, ...styles.input }}
            keyboardType="default"
            placeholder="Place..."
            placeholderTextColor="#BDBDBD"
          />
          <Button
            //  onSubmit={handleSubmit}
            text="Publish"
          />
          <View style={styles.deletePost}>
            <Image
              style={styles.delete}
              source={require("../../assets/img/deletePost.png")}
            ></Image>
          </View>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingTop: 55,
    paddingBottom: 11,
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  boxPhoto: {
    width: "100%",
    height: 200,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  addPhoto: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
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
});
