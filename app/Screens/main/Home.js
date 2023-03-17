import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegistrationScreen from "../auth/RegistrationScreen";
import LoginScreen from "../auth/LoginScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Ionicons } from "@expo/vector-icons";


const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const Home = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: true }} // header щоб забрати
      >
        <AuthStack.Screen name="registration" component={RegistrationScreen} />
        <AuthStack.Screen name="login" component={LoginScreen} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Posts") {
          iconName = focused
            ? "apps-outline"
            : "apps-outline";
        } else if (route.name === "Create") {
          iconName = focused ? "add-circle-outline" : "add-circle-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "happy-outline" : "happy-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "#FF6C00",
      inactiveTintColor: "rgba(33, 33, 33, 0.8)",
    }}
    >
      <MainTab.Screen name="Posts"  
      
      
      
     component={PostsScreen} />
      <MainTab.Screen name="Create" component={CreatePostsScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
};
export default Home;

