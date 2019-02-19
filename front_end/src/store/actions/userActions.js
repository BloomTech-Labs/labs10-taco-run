import axios from "axios";

export const USER_FETCH_START = "USER_FETCH_START";
export const USER_FETCH_COMPLETE = "USER_FETCH_COMPLETE";
export const USER_FETCH_ERROR = "USER_FETCH_ERROR";

export const FAVORITES_FETCH_START = "FAVORITES_FETCH_START";
export const FAVORITES_FETCH_COMPLETE = "FAVORITES_FETCH_COMPLETE";
export const FAVORITES_FETCH_ERROR = "FAVORITES_FETCH_ERROR";

export const FRIENDS_FETCH_START = "FRIENDS_FETCH_START";
export const FRIENDS_FETCH_COMPLETE = "FRIENDS_FETCH_COMPLETE";
export const FRIENDS_FETCH_ERROR = "FRIENDS_FETCH_ERROR";

export const USERS_SEARCH_START = "USERS_SEARCH_START";
export const USERS_SEARCH_COMPLETE = "USERS_SEARCH_COMPLETE";
export const USERS_SEARCH_ERROR = "USERS_SEARCH_ERROR";

export const fetchUser = id => {
  return dispatch => {
    dispatch({ type: USER_FETCH_START });
    axios
      .get(`https://production-taco.herokuapp.com/users/${id}/info`)
      .then(res => {
        dispatch({ type: USER_FETCH_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: USER_FETCH_ERROR });
      });
  };
};

export const fetchFavorites = id => {
  return dispatch => {
    dispatch({ type: FAVORITES_FETCH_START });
    axios
      .get(`https://production-taco.herokuapp.com/favorites/${id}`)
      .then(res => {
        dispatch({ type: FAVORITES_FETCH_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FAVORITES_FETCH_ERROR });
      });
  };
};

export const fetchFriends = id => {
  return dispatch => {
    dispatch({ type: FRIENDS_FETCH_START });
    axios
      .get(`https://production-taco.herokuapp.com/users_friends/${id}`)
      .then(res => {
        dispatch({ type: FRIENDS_FETCH_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FRIENDS_FETCH_ERROR });
      });
  };
};

export const searchUsers = term => {
  return dispatch => {
    dispatch({ type: USERS_SEARCH_START });
    axios
      .get(`http://localhost:5555/users/search/${term}`)
      .then(res => {
        console.log(res);
        dispatch({ type: USERS_SEARCH_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: USERS_SEARCH_ERROR });
      });
  };
};
