import {
  USER_FETCH_START,
  USER_FETCH_COMPLETE,
  USER_FETCH_ERROR,
  FAVORITES_FETCH_START,
  FAVORITES_FETCH_COMPLETE,
  FAVORITES_FETCH_ERROR,
  FRIENDS_FETCH_START,
  FRIENDS_FETCH_COMPLETE,
  FRIENDS_FETCH_ERROR
} from "../actions/userActions";

const initialState = {
  user: {},
  fetchingUser: false,
  fetchedUser: false,

  favorites: [],
  fetchingFavorites: false,
  fetchedFavorites: false,

  friends: [],
  fetchingFriends: false,
  fetchedFriends: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FETCH_START:
      return {
        ...state,
        fetchingUser: true
      };

    case USER_FETCH_COMPLETE:
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
        fetchedUser: true
      };

    case USER_FETCH_ERROR:
      return {
        ...state,
        error: "Error fetching user"
      };

    case FAVORITES_FETCH_START:
      return {
        ...state,
        fetchingFavorites: true
      };

    case FAVORITES_FETCH_COMPLETE:
      return {
        ...state,
        favorites: action.payload,
        fetchingFavorites: false,
        fetchedFavorites: true
      };

    case FAVORITES_FETCH_ERROR:
      return {
        ...state,
        error: "Error fetching friends"
      };

    case FRIENDS_FETCH_START:
      return {
        ...state,
        fetchingFriends: true
      };

    case FRIENDS_FETCH_COMPLETE:
      return {
        ...state,
        friends: action.payload,
        fetchingFriends: false,
        fetchedFriends: true
      };

    case FRIENDS_FETCH_ERROR:
      return {
        ...state,
        error: "Error fetching friends"
      };

    default:
      return state;
  }
};

export default userReducer;
