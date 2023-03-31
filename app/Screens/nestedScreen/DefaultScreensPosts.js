import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import Container from "../../Components/Container";
import dataBase from "../../firebase/config";
import { authSignOutUser } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";


export default function DefaultScreensPosts() {
  const [post, setPost] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch(); //створюємо портал


//=========================================
const [allComments, setAllComments] = useState([]);

useEffect(() => {
  getAllComments();
}, []);

const getAllComments = async () => {
 const AllComments=  dataBase
    .firestore()
    // .collection("posts")
    // .doc(postId)
    .collection("comments")
    .onSnapshot((data) =>
      setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    console.log("DefaultScreensPosts allComments", allComments);
};


// console.log('====================================');
// console.log("allComments", allComments.length);

//=========================================
const getAllPost = async () => {
  const postRef = await dataBase
    .firestore()
    .collection("posts")
    .onSnapshot((data) => setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
};

useEffect(() => {
getAllPost();
}, []);
// console.log('====================================');
// console.log("post Coment", post[0]);
  const userLogin = dataBase.auth().currentUser.displayName;
  const userPhoto = dataBase.auth().currentUser.photoURL;
  const userEmail = dataBase.auth().currentUser.email;

  const handleSignOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Posts</Text>
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
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.user}>
          <View>
            <Image
              style={styles.imgUser}
              source={require("../../assets/img/user.png")}
            ></Image>
          </View>
          <View>
            <Text style={styles.title}>{userLogin}</Text>
            <Text style={styles.title}>{userEmail}</Text>
          </View>
        </View>
      </View>
      <SafeAreaView style={styles.postMap}>
        {post && (
          <FlatList
            data={post}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: { photoInfo, location, photo, id } }) => (
              <View style={{ paddingTop: 32, paddingHorizontal:16 }}>
                <Image source={{ uri: photo }} style={styles.postImage} />
                <Text style={styles.postName}>{photoInfo.name}</Text>

                <View style={styles.postWrap}>
                  <View style={styles.postComment}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("CommentsScreen", {postId: id});
                      }}
                    >
                      <EvilIcons name="comment" size={24} color="#BDBDBD" />
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
        )}
   </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
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
