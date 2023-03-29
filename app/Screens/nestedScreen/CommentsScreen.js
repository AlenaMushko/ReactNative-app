import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import Container from "../../Components/Container";
import { Ionicons } from "@expo/vector-icons";
import dataBase from "../../firebase/config";
import { useSelector } from "react-redux";

export default function CommentsScreen({ route }) {
  const [newComment, setNewComment] = useState("");
  const { postId } = route.params; // отримуємо із DefaultScreensPosts

  const navigation = useNavigation();
  // const photoComment = route.postId
  // console.log("photoComment", photoComment);

  const nickName = useSelector((state) => state.auth.login); // з бд беремо ід юзера
  console.log("====================================");
  console.log("postId", postId, nickName);
  // створюємо колекцію коментарів
  const createComment = async () => {
    const commentToDB = await dataBase
      .firestore()
      .collection("posts")
      .doc(postId);
    console.log("====================================");
    console.log("commentToDB", commentToDB);
    const commentFromDB = await dataBase
    .firestore().collection("comments").add({
      comment,
      nickName,
    });
    console.log("====================================");
    console.log("commentFromDB", commentFromDB);
  };

  const handleArrow = () => {
    navigation.navigate("DefaultScreensPosts");
  };

  const handleSetComment = () => {};
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
        <View style={styles.comment}>
          {/* <Image source={{ uri: photo }} style={styles.commentImg} /> */}
          {/* <FlatList
          data={comments}
          keyExtractor={(comments, index) => index.toString()}
          renderItem={({ comment: { comment } }) => (
            <View style={{ paddingTop: 32 }}>
              <Text style={styles.commentText}>{photoInfo.name}</Text>
            </View>
          )}
        /> */}
          <TextInput
            style={{ ...styles.title, ...styles.input, marginLeft: 32 }}
            keyboardType="default"
            placeholder="Comment..."
            placeholderTextColor="#BDBDBD"
            // onChangeText={(value) =>
            //   setNewComment((prevState) => ({
            //     ...prevState,
            //     name: value,
            //   }))
            // }
            onChangeText={setNewComment}
            // value={photoInfo.place}
          />
          <View style={styles.arrow} onPress={createComment}>
            <Ionicons
              name="md-arrow-up-circle-sharp"
              size={44}
              color="#FF6C00"
              onPress={createComment}
            />
          </View>
        </View>
      </View>
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
  comment: {},
  commentImg: {},
  commentText: {},
  title: {
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  commentsScreen: {
    flex: 1,
    // justifyContent: "flex-end",
    justifyContent: "space-evenly",
    marginBottom: 16,
    marginHorizontal: 16,
  },
  input: {
    marginBottom: 16,
    height: 50,
    borderRadius: 100,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    position: "relative",
  },
  arrow: {
    position: "absolute",
    right: 8,
    top: 0,
  },
});
