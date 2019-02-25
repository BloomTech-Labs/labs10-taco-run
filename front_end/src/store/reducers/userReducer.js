import {
  USER_FETCH_START,
  USER_FETCH_COMPLETE,
  USER_FETCH_ERROR,  
  FRIENDS_FETCH_START,
  FRIENDS_FETCH_COMPLETE,
  FRIENDS_FETCH_ERROR,
  USERS_SEARCH_START,
  USERS_SEARCH_COMPLETE,
  USERS_SEARCH_ERROR
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
  fetchedFriends: false,

  users: [],
  searchingUsers: false,
  searchedUsers: false
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

    case USERS_SEARCH_START:
      return {
        ...state,
        searchingUsers: true
      };

    case USERS_SEARCH_COMPLETE:
      return {
        ...state,
        users: action.payload,
        searchingUsers: false,
        searchedUsers: true
      };

    case USERS_SEARCH_ERROR:
      return {
        ...state,
        error: "Error searching users"
      };

    default:
      return state;
  }
};

export default userReducer;
