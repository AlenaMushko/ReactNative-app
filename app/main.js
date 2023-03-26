import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import useRoute from "./router";
import { useEffect } from "react";
import { authStateChangeUser } from "./Screens/redux/auth/authOperations";

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
  
   const  stateChange  = useSelector((state) => state.auth.stateChange);
  console.log("stateChange", stateChange);

  const routing = useRoute(null);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
