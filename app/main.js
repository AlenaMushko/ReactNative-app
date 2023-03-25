import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import useRoute from "./router";

export default function Main() {
  const ReducX_State = useSelector((state) => state);
  console.log("Redux-State====>", ReducX_State);
  const routing = useRoute(null);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
