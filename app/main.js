import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import useRoute from "./router";

export default function Main() {
  const routing = useRoute(null);

  const ReducX_State = useSelector((state) => state);
  console.log("Redux-State====>", ReducX_State);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
