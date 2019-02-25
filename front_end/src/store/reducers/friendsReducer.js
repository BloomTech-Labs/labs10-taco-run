import {
  FRIEND_ADD_START,
  FRIEND_ADD_COMPLETE,
  FRIEND_ADD_ERROR
} from "../actions/friendsActions";

const initialState = {
  addingFriend: false,
  addedFriend: false,
  error: null
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIEND_ADD_START:
      return {
        ...state,
        addingFriend: true,
        searchedFavorites: false
      };
    case FRIEND_ADD_COMPLETE:
      return {
        ...state,
        locations: action.payload,
        addingFriend: false,
        addedFriend: true,
        error: null
      };

    case FRIEND_ADD_ERROR:
      return {
        ...state,
        error: "Error adding friend"
      };
    default:
      return state;
  }
};

export default friendsReducer;
