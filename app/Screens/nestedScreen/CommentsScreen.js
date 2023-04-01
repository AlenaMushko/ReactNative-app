import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import { useKeyboard } from "@react-native-community/hooks";
import Container from "../../Components/Container";
import { Ionicons } from "@expo/vector-icons";
import dataBase from "../../firebase/config";

export default function CommentsScreen({ route }) {
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [postPhoto, setPostPhoto] = useState([]);
  const { postId } = route.params; // отримуємо із DefaultScreensPosts
  const userId = useSelector((state) => state.auth.userId);
  const navigation = useNavigation();
  const nickName = useSelector((state) => state.auth.login); // з бд беремо ід юзера
  const keyboard = useKeyboard();

  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getAllPosts();
    getUserPosts();
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      // return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  const getUserPosts = async () => {
    await dataBase
      .firestore()
      .collection("posts")
      .doc(postId)
      .get()
      .then((doc) => {
        const comment = doc.data().photo;
        setPostPhoto(comment);
      });
  };

  const PostDate = () => {
    const currentDate = new Date(); // створення об'єкту Date з поточного часу
    const dayOfMonth = currentDate.getDate();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return [
      dayOfMonth,
      " ",
      month,
      ",",
      " ",
      year,
      " ",
      "|",
      " ",
      hours,
      ":",
      minutes,
    ];
  };
  const postDate = PostDate();

  // створюємо колекцію коментарів
  const createComment = async () => {
    dataBase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        newComment,
        nickName,
        postDate,
      });
  };

  const getAllPosts = async () => {
    dataBase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };
  const handleArrow = () => {
    navigation.navigate("DefaultScreensPosts");
  };

  const handleCreatePost = () => {
    if (newComment.length < 3) {
      setErrorMessage("Text must be at least 3 characters long.");
    } else {
      setErrorMessage("")
      setShowAlert(true);
      createComment();
      Keyboard.dismiss();
      setNewComment("");
    }
    console.log("alert", showAlert);
  };
  // console.log('====================================');
  // console.log("allComments", allComments.length);

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Comments</Text>
        <View style={styles.goToPosts}>
          <AntDesign.Button
            name="arrowleft"
            size={24}
            color={"#BDBDBD"}
            backgroundColor={"transparent"}
            header={20}
            onPress={handleArrow}
          />
          <Text style={styles.textHeader}>Posts</Text>
        </View>
      </View>

      <View style={styles.commentsScreen}>
        {!keyboard.keyboardShown && (
          <>
            {postPhoto && (
              <View style={{ marginTop: 32 }}>
                <Image source={{ uri: postPhoto }} style={styles.commentImg} />
              </View>
            )}

            <SafeAreaView style={styles.containerComments}>
              <FlatList
                data={allComments}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { newComment, nickName, postDate } }) => (
                  <View style={styles.comment}>
                    <Text state={styles.commentNickName}>{nickName}</Text>
                    <View style={styles.post}>
                      <Text style={styles.commentText}>{newComment}</Text>
                      <Text style={styles.date}>{postDate}</Text>
                    </View>
                  </View>
                )}
              />
            </SafeAreaView>
          </>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ position: "relative" }}>
            <TextInput
              style={{ ...styles.title, ...styles.input, marginLeft: 32 }}
              keyboardType="default"
              placeholder="Comment..."
              placeholderTextColor="#BDBDBD"
              value={newComment}
              onChangeText={setNewComment}
            />
            <View style={styles.arrow}>
              <Ionicons
                name="md-arrow-up-circle-sharp"
                size={44}
                color="#FF6C00"
                onPress={handleCreatePost}
              />
            </View>
            {showAlert && <Text>Comment is created</Text>}
            {errorMessage ? (
              <Text style={{color:"#ff0000"}}>{errorMessage}</Text>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  goToPosts: {
    position: "absolute",
    left: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  textHeader: {
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  commentsScreen: {
    flex: 1,
    justifyContent: "space-evenly",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  commentImg: {
    height: 240,
    borderRadius: 8,
  },
  containerComments: {
    flex: 1,
    marginTop: 32,
  },
  comment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  commentNickName: {},
  post: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    width: "100%",
    marginLeft: 16,
    borderRadius: 6,
  },
  commentText: {
    fontFamily: "Roboto_Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  date: {
    fontFamily: "Roboto_Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    marginTop: 8,
  },
  title: {
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    marginBottom: 16,
    height: 50,
    borderRadius: 100,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  arrow: {
    position: "absolute",
    right: 8,
    top: 0,
  },
});
