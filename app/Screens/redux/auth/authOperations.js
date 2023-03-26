import dataBase from "../../../firebase/config";
import {
  updateUserProfile,
  authStateChange,
  authSignOut,
} from "./authSliceReducer";

const authSignUpUser =
  ({ email, password, login, userPhoto }) =>
  async (dispatch, getState) => {
    try {
      await dataBase.auth().createUserWithEmailAndPassword(email, password); //реєструємо
      const user = await dataBase.auth().currentUser; //обновляємо профіль

      await user.updateProfile({ displayName: login, photoURL: userPhoto }); // в обновлений профіль записуємо їмя

      const updateUserSuccess = await dataBase.auth().currentUser; //обновляємо профіль з новим імям
      const userUpdateProfile = {
        userId: updateUserSuccess.uid,
        login: updateUserSuccess.displayName,
        userPhoto: updateUserSuccess.photoURL,
      };
      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await dataBase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  };
const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await dataBase.auth().signOut();
    dispatch(authSignOut());
  } catch (error) {
    console.log(error.message);
    console.log(error);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await dataBase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user Operation", user);
        const userUpdateProfile = {
          userId: user.uid,
          login: user.displayName,
          userPhoto: user.photoURL,
        };

        dispatch(authStateChange({ stateChange: true })); //якщо є зарєєстрований користувач, то автоматично входимо
        console.log("dispatch stateChange", user);
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log(error.message);
    console.log(error);
  }
};

const authGetState = async () => {
  try {
    const snapshot = await dataBase.auth().getRedirectResult
    snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
  } catch (error) {
    console.log(error);
  }
};

export { authSignInUser, authSignOutUser, authSignUpUser, authStateChangeUser, authGetState };
