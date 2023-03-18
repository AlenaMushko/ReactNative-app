import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/main/Home";

const AuthStack = createStackNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: false }} // header щоб забрати
      >
        <AuthStack.Screen name="registration" component={RegistrationScreen} />
        <AuthStack.Screen name="login" component={LoginScreen} />
        <AuthStack.Screen name="home" component={Home} />
      </AuthStack.Navigator>
    );
  }
  return (
   <Home/>
  );
};
export default useRoute;

