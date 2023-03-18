import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Container from "../../Components/Container";

export default function PostsScreen() {
  const navigation = useNavigation();
  const handleLogOut = () => {
    navigation.navigate("login");
  };
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Posts</Text>
        <View style={styles.logoutBtn}>
          <AntDesign.Button
            name="logout"
            color={"#BDBDBD"}
            backgroundColor={"transparent"}
            header={20}
            onPress={handleLogOut}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.user}>
          <View>
            <Image
              style={styles.imgUser}
              source={require("../../assets/img/user.png")}
            ></Image>
          </View>
          <View>
            <Text style={styles.nameUser}>Natali Romanova</Text>
            <Text style={styles.emailUser}>email@example.com</Text>
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
  logoutBtn: {
    position: "absolute",
    right: 16,
    bottom: 5,
  },
  user: {
    flexDirection: "row",
    paddingTop:32,
    paddingHorizontal:16,
  },
  imgUser: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginRight:8,
  },
  nameUser: {
    fontFamily: "Roboto_Bold",
    color: "#212121",
    fontSize: 13,
    lineHeight: 15,
  },
  emailUser: {
    fontFamily: "Roboto_Regular",
    color: "rgba(33, 33, 33, 0.8)",
    fontSize: 11,
    lineHeight: 13,
  },
});
