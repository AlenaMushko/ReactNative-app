import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "../main/PostsScreen";
import CreatePostsScreen from "../main/CreatePostsScreen";
import ProfileScreen from "../main/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const Home = () => {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#efb810",
        tabBarInactiveTintColor: "#BDBDBD",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "posts") {
            iconName = focused ? "apps-outline" : "apps-outline";
          } else if (route.name === "create") {
            iconName = focused ? "add-circle-outline" : "add-circle-outline";
          } else if (route.name === "profile") {
            iconName = focused ? "happy-outline" : "happy-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <MainTab.Screen name="posts" component={PostsScreen} />
      <MainTab.Screen name="create" component={CreatePostsScreen} />
      <MainTab.Screen name="profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
};

export default Home;
