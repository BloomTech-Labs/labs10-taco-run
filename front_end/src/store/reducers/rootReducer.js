import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import eventReducer from './eventReducer'

import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
  firebase: firebaseReducer,
  users: userReducer,
});

export default rootReducer;
