import * as firebase from "firebase";
import "firebase/auth"; //можливість авторизації
import "firebase/storage";
import "firebase/firestore"; // база даних після реєстрації

const firebaseConfig = {
  apiKey: "AIzaSyDYOmHRk9ubnh4tc0zGRVaj8Sxetg4To3A",
  authDomain: "react-native-app-9332a.firebaseapp.com",
  projectId: "react-native-app-9332a",
  storageBucket: "react-native-app-9332a.appspot.com",
  messagingSenderId: "1020460620053",
  appId: "1:1020460620053:web:a724fa84ce3ab73680711c",
  measurementId: "G-ZKQQTT0K12",
};

firebase.initializeApp(firebaseConfig); //метод що приймає обєкт з налаштуваннями
export default firebase;





