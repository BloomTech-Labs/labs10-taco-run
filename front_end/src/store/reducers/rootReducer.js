import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import eventsReducer from "./eventsReducer";
import commentsReducer from "./commentsReducer";

import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  userReducer,
  eventsReducer,
  commentsReducer
});

export default rootReducer;
