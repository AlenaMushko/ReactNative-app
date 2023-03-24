import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import useRoute from "./router";
import { store } from "./Screens/redux/store";

export default function App() {
  const routing = useRoute(null);

  return (
    <>
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
   </Provider>
    </>
    
  );
}
