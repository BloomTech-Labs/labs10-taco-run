import axios from "axios";

export const FAVORITES_SEARCH_START = "FAVORITES_SEARCH_START";
export const FAVORITES_SEARCH_COMPLETE = "FAVORITES_SEARCH_COMPLETE";
export const FAVORITES_SEARCH_ERROR = "FAVORITES_SEARCH_ERROR";

export const FAVORITES_DELETE_START = "FAVORITES_DELETE_START";
export const FAVORITES_DELETE_COMPLETE = "FAVORITES_DELETE_COMPLETE";
export const FAVORITES_DELETE_ERROR = "FAVORITES_DELETE_ERROR";

export const searchFavorites = term => {
  return dispatch => {
    dispatch({ type: FAVORITES_SEARCH_START });
    axios
      .get(`https://production-taco.herokuapp.com/favorites/search/${term}`)
      .then(res => {
        console.log(res.data);
        dispatch({ type: FAVORITES_SEARCH_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FAVORITES_SEARCH_ERROR, payload: err });
      });
  };
};

export const deleteFavorite = favorite => dispatch => {
  dispatch({ type: FAVORITES_DELETE_START });
  axios
    .delete(`https://production-taco.herokuapp.com/favorites/${favorite}`)
    .then(res => {
      console.log(res.data);
      dispatch({ type: FAVORITES_DELETE_COMPLETE, payload: res.data });
    })
    .catch(err => dispatch({ type: FAVORITES_DELETE_ERROR, payload: err }));
}
