import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import eventReducers from './eventReducers'

import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducers,
  firebase: firebaseReducer,
  users: userReducer,
  events: eventReducers
});

export default rootReducer;
