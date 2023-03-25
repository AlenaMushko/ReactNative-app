import baseDate from "../../../firebase/config";

const authSignUpUser = ({ email, password, login })=> async (dispatch, getState)=>{
    try{
const user = await baseDate.auth().createUserWithEmailAndPassword(email, password);
console.log("user", user);
    }catch (error) { 
        console.log(error.message);
        console.log(error);
      }
};
 const authSignInUser = ()=> async (dispatch, getState)=>{};
 const authSignOutUser = ()=> async (dispatch, getState)=>{};

 export {authSignInUser, authSignOutUser, authSignUpUser};
