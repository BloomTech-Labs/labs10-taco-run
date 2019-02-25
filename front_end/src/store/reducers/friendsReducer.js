import {
  FRIENDS_ADD_START,
  FRIENDS_ADD_COMPLETE,
  FRIENDS_ADD_ERROR
} from "../actions/favoritesActions";

const initialState = {
  addingFriend: false,
  addedFriend: false,
  error: null
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIENDS_ADD_START:
      return {
        ...state,
        addingFriend: true,
        searchedFavorites: false
      };
    case FRIENDS_ADD_COMPLETE:
      return {
        ...state,
        locations: action.payload,
        addingFriend: false,
        addedFriend: true,
        error: null
      };

    case FRIENDS_ADD_ERROR:
      return {
        ...state,
        error: "Error adding friend"
      };
    default:
      return state;
  }
};

export default friendsReducer;
