import { NavigationContainer} from "@react-navigation/native";
import useRoute from "./rourer";
 

export default function App() {
  const routing = useRoute(null);

  return <NavigationContainer>{routing}</NavigationContainer>;
}


