import { NavigationContainer } from "@react-navigation/native";
import Home from "./Screens/main/Home";


export default function App() {
  const routing = Home({});

  return <NavigationContainer>{routing}</NavigationContainer>;
}
