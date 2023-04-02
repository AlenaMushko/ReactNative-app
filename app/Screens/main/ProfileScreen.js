import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AddUserIcon from "../../assets/svg/addUserIcon";
import Container from "../../Components/Container";
import { authSignOutUser } from "../redux/auth/authOperations";
import dataBase from "../../firebase/config";

export default function ProfileScreen({ route }) {
  const [likes, setLikes] = useState(0);
  const [post, setPost] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch(); //створюємо портал
  const navigation = useNavigation();

  const selectCurrentUser = (state) => state.auth;
  const { login, email, userPhoto } = useSelector(selectCurrentUser);

  useEffect(() => {
    if (route.params) {
      setPost((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  useEffect(() => {
    getUserPosts();
  }, []);

  const handleSignOut = () => {
    dispatch(authSignOutUser());
  };

  const getUserPosts = async () => {
    await dataBase
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  const handleCalculateLikes = () => {
    setLikes(likes + 1);
  };

  return (
    <Container>
      <ImageBackground
        style={styles.imgBg}
        source={require("../../assets/img/BGbgMountains.png")}
      >
        <View style={styles.box}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.userPhoto}>
              <ImageBackground style={styles.imgBg} source={{ uri: userPhoto }}>
                <AddUserIcon
                  style={styles.addPhoto}
                  fill={"#E8E8E8"}
                  stroke={"#E8E8E8"}
                />
              </ImageBackground>
            </View>

            <View style={styles.logoutBtn}>
              <AntDesign.Button
                name="logout"
                size={24}
                color={"#BDBDBD"}
                backgroundColor={"transparent"}
                header={20}
                onPress={handleSignOut}
              />
            </View>
            <Text style={styles.title}>{login}</Text>
          </View>
          <SafeAreaView style={styles.postMap}>
            <FlatList
              data={userPosts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({
                item: { photoInfo, location, photo, userId },
              }) => (
                <View style={{ paddingTop: 32 }}>
                  <Image source={{ uri: photo }} style={styles.postImage} />
                  <Text style={styles.postName}>{photoInfo.name}</Text>

                  <View style={styles.postWrap}>
                    <View style={styles.postComment}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("CommentsScreen", {
                            postId: userId,
                          });
                        }}
                      >
                        <Entypo name="message" size={24} color="#FF6C00" />
                      </TouchableOpacity>
                      <Text
                        style={{
                          ...styles.postText,
                          ...styles.postNumberComment,
                        }}
                      >
                        0
                      </Text>
                    </View>

                    <View style={{ ...styles.postComment, marginLeft: 27 }}>
                      <TouchableOpacity onPress={handleCalculateLikes}>
                        <AntDesign name="like1" size={24} color="#FF6C00" />
                      </TouchableOpacity>
                      <Text
                        style={{
                          ...styles.postText,
                          ...styles.postNumberComment,
                        }}
                      >
                        {likes}
                      </Text>
                    </View>

                    <View style={styles.geolocation}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("MapScreen", { location })
                        }
                      >
                        <Image
                          style={styles.geolocationSvg}
                          source={require("../../assets/img/geolocation.png")}
                        ></Image>
                      </TouchableOpacity>
                      <Text style={{ ...styles.postText, ...styles.postPlace }}>
                        {photoInfo.place}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  imgBg: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  box: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    //   justifyContent: "center",
    position: "relative",
    marginTop: 147,
  },
  userPhoto: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: -60,
  },
  addPhoto: {
    position: "absolute",
    right: -13,
    bottom: 20,
  },
  logoutBtn: {
    position: "absolute",
    right: 0,
    top: 22,
  },
  title: {
    fontFamily: "Roboto_Medium",
    fontSize: 30,
    letterSpacing: 0.01,
    lineHeight: 35,
    marginTop: 92,
  },

  postMap: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
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
