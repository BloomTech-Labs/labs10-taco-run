import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import eventReducers from '../../components/events/eventReducers'

import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducers,
  firebase: firebaseReducer,
  userReducer
});

export default rootReducer;
