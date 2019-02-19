
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
    case "USER_FETCH_START":
      return {
        ...state,
        fetchingUser: true
      };

    case "USER_FETCH_COMPLETE":
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
        fetchedUser: true
      };

    case "USER_FETCH_ERROR":
      return {
        ...state,
        error: "Error fetching user"
      };

    case "FAVORITES_FETCH_START":
      return {
        ...state,
        fetchingFavorites: true
      };

    case "FAVORITES_FETCH_COMPLETE":
      return {
        ...state,
        favorites: action.payload,
        fetchingFavorites: false,
        fetchedFavorites: true
      };

    case "FAVORITES_FETCH_ERROR":
      return {
        ...state,
        error: "Error fetching favorites"
      };

    case "FRIENDS_FETCH_START":
      return {
        ...state,
        fetchingFriends: true
      };

    case "FRIENDS_FETCH_COMPLETE":
      return {
        ...state,
        friends: action.payload,
        fetchingFriends: false,
        fetchedFriends: true
      };

    case "FRIENDS_FETCH_ERROR":
      return {
        ...state,
        error: "Error fetching friends"
      };

    case "USERS_SEARCH_START":
      return {
        ...state,
        searchingUsers: true
      };

    case "USERS_SEARCH_COMPLETE":
      return {
        ...state,
        users: action.payload,
        searchingUsers: false,
        searchedUsers: true
      };

    case "USERS_SEARCH_ERROR":
      return {
        ...state,
        error: "Error searching users"
      };

    default:
      return state;
  }
};

export default userReducer;
