import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  userReducer
});

export default rootReducer;
