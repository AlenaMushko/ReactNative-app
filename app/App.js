import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";



const AuthStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: false }}
      >
        <AuthStack.Screen name="registration" component={RegistrationScreen} />
        {/* <AuthStack.Screen name="login" component={LoginScreen} /> */}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}