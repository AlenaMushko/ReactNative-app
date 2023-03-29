import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from "react-native";
import Container from "../../Components/Container";
import Button from "../../Components/Button";


export default function CommentsScreen() {
  const navigation = useNavigation();
    const handleArrow = () => {
      navigation.navigate("DefaultScreensPosts");
    };
  
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
          <View style={styles.location}>
              <Image
                style={styles.geolocation}
                source={require("../../assets/img/geolocation.png")}
              ></Image>

              <TextInput
                style={{ ...styles.title, ...styles.input, marginLeft: 32 }}
                keyboardType="default"
                placeholder="Place..."
                placeholderTextColor="#BDBDBD"
                onChangeText={(value) =>
                  setPhotoInfo((prevState) => ({
                    ...prevState,
                    place: value,
                  }))
                }
                value={photoInfo.place}
              />
            </View>
            <Button
              onSubmit={sendPhoto}
              text="Publish"
              disabledBtn={false}
            />
      </Container>
      )
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
      alignItems: 'center' 
    },
   textHeader: {
      fontFamily: "Roboto_Medium",
      fontSize: 16,
      lineHeight: 19,
      color: "#212121",
    },
  });
  
  
  
  
  
  
  
  
  




