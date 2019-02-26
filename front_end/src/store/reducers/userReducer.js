import {
  USER_FETCH_START,
  USER_FETCH_COMPLETE,
  USER_FETCH_ERROR,
  OTHER_USER_FETCH_START,
  OTHER_USER_FETCH_COMPLETE,
  OTHER_USER_FETCH_ERROR,
  USERS_SEARCH_START,
  USERS_SEARCH_COMPLETE,
  USERS_SEARCH_ERROR
} from "../actions/userActions";

const initialState = {
  user: {},
  fetchingUser: false,
  fetchedUser: false,

  otherUser: {},
  fetchingOtherUser: false,
  fetchedOtherUser: false,

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

    case OTHER_USER_FETCH_START:
      return {
        ...state,
        fetchingUser: true
      };

    case OTHER_USER_FETCH_COMPLETE:
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
        fetchedUser: true
      };

    case OTHER_USER_FETCH_ERROR:
      return {
        ...state,
        error: "Error fetching other user"
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
