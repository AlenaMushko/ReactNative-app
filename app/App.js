import { Provider } from "react-redux";
import Main from "./main";
import { store } from "./Screens/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
