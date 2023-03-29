import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Container from "../../Components/Container";

export default function MapScreen({ route }) {
  const [location, setLocation] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    if (route.params) {
      setLocation((prevState) => {
        return [...prevState, route.params];
      });
    }
  }, [route.params]);

  const handleArrow = () => {
    navigation.navigate("DefaultScreensPosts");
  };

  const locationObj = { ...location }[0];

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Map</Text>
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
      {locationObj && (
        <MapView
          style={styles.map}
         initialRegion={{
            latitude: locationObj.location.latitude,
            longitude: locationObj.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.006,
          }}
        >
          <Marker
            coordinate={{
              latitude: locationObj.location.latitude,
              longitude: locationObj.location.longitude,
            }}
            title="this photo"
          />
        </MapView>
      )}
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
  map: {
    flex: 1,
    justifyContent: "center",
  },
});
