import React from "react";
import { ModuleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreensPosts from "../nestedScreen/DefaultScreensPosts";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import MapScreen from "../nestedScreen/MapScreen";

const NestedScreens = createStackNavigator();

export default function PostsScreen({ route }) {

  return (
    <NestedScreens.Navigator
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      headerShown: false,
    })}
  >
      <NestedScreens.Screen
        name="DefaultScreensPosts"
        component={DefaultScreensPosts}
      />
      <NestedScreens.Screen name="CommentsScreen" component={CommentsScreen} />
      <NestedScreens.Screen name="MapScreen" component={MapScreen} />
    </NestedScreens.Navigator>
  );
}

