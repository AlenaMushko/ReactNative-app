import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import useRoute from "./router";
import { useEffect } from "react";
import { authStateChangeUser } from "./Screens/redux/auth/authOperations";

export default function Main() {
  const dispatch = useDispatch();

  const stateChange = useSelector((state) => state.auth.stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
