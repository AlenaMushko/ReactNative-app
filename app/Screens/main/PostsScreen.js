import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Container from "../../Components/Container";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function PostsScreen({ route }) {
  // route приймаємо фото і опис
  const [post, setPost] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    if (route.params) {
      setPost((prevState) => {
        return [...prevState, route.params];
      });
    }
  }, [route.params]);
  console.log("posts", post);

  // console.log("====================================");
  // console.log("latitude create", location.coords.latitude);
  // console.log("longitude create", location.coords.longitude);
  // console.log("====================================");

  // let userState = post[0];
  // let userEmail = "";
  // let userLogin = "";
  // if (userState !== undefined) {
  //   userEmail = userState.state.email;
  // }

  // if (userState?.state?.login !== undefined) {
  //   userLogin = userState.state.login;
  // }

  const handleLogOut = () => {
    navigation.navigate("login");
  };

  // if (post?.photo) {
  //   console.log(post);
  //   console.log(post.photo);
  //   console.log(post.photoInfo.name);
  //   console.log(post.photoInfo.place);
  // }

  return (
    <Container>
      {/* <View style={styles.header}>
        <Text style={styles.title}>Posts</Text>
        <View style={styles.logoutBtn}>
          <AntDesign.Button
            name="logout"
            size={24}
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
            {userLogin.length > 1 ? (
              <Text style={styles.title}>{userLogin}</Text>
            ) : (
              <Text style={styles.title}>userLogin</Text>
            )}
            {userEmail.length > 1 ? (
              <Text style={styles.title}>{userEmail}</Text>
            ) : (
              <Text style={styles.title}>userEmail</Text>
            )}
          </View>
        </View>
      </View> */}
      <View style={styles.header}>
        <Text style={styles.title}>Posts</Text>
        <View style={styles.logoutBtn}>
          <AntDesign.Button
            name="logout"
            size={24}
            color={"#BDBDBD"}
            backgroundColor={"transparent"}
            header={20}
            onPress={handleLogOut}
          />
        </View>
      </View>
      <View>
        <View style={styles.user}>
          <View>
            <Image
              style={styles.imgUser}
              source={require("../../assets/img/user.png")}
            ></Image>
          </View>
          <View>
            <Text style={styles.title}>userLogin</Text>
            <Text style={styles.title}>userEmail</Text>
          </View>
        </View>
      </View>
      <View style={styles.postMap}>
        {post &&  <FlatList
          data={post}
          renderItem={({ item }) => (
            <View style={{ paddingTop: 32 }}>
              <Image source={{ uri: item.photo }} style={styles.postImage} />
              <Text style={styles.postName}>{item.photoInfo.name}</Text>

              <View style={styles.postWrap}>
                <View style={styles.postComment}>
                  <EvilIcons name="comment" size={24} color="#BDBDBD" />
                  <Text
                    style={{ ...styles.postText, ...styles.postNumberComment }}
                  >
                    0
                  </Text>
                </View>

                <View style={styles.geolocation}>
                  <Image
                    style={styles.geolocationSvg}
                    source={require("../../assets/img/geolocation.png")}
                  ></Image>
                  <Text style={{ ...styles.postText, ...styles.postPlace }}>
                    {item.photoInfo.place}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />}

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
  logoutBtn: {
    position: "absolute",
    right: 16,
    bottom: 0,
  },
  user: {
    flexDirection: "row",
    paddingTop: 32,
  },
  imgUser: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginRight: 8,
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
  postMap: {
    flex: 1,
    justifyContent: "center",
  },
  postImage: {
    height: 240,
    borderRadius: 8,
  },
  postName: {
    marginTop: 8,
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  postWrap: {
    // position: "relative",
    marginTop: 8,
    flexDirection: "row",
  },
  postComment: {
    flexDirection: "row",
  },
  postNumberComment: {
    color: "#BDBDBD",
    marginLeft: 8,
  },
  geolocation: {
    position: "absolute",
    right: 0,
    bottom: 0,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  geolocationSvg: {
    width: 24,
    height: 24,
    color: "#BDBDBD",
    marginRight: 8,
  },
  postText: {
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  postPlace: {
    color: "#212121",
  },
});
