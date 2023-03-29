import * as firebase from "firebase";
import "firebase/auth"; //можливість авторизації
import "firebase/storage";
import "firebase/firestore"; // база даних після реєстрації

const firebaseConfig = {
  apiKey: "AIzaSyCjuXaJaN6Hk3eXXl5L7Y99uRCuIDcPZKw",
  authDomain: "reactnative-app-f5f90.firebaseapp.com",
  projectId: "reactnative-app-f5f90",
  storageBucket: "reactnative-app-f5f90.appspot.com",
  messagingSenderId: "94114037056",
  appId: "1:94114037056:web:5fefea6385a198c5348ea5",
  measurementId: "G-RPG4TS203W"
};

firebase.initializeApp(firebaseConfig); //метод що приймає обєкт з налаштуваннями
export default firebase;





