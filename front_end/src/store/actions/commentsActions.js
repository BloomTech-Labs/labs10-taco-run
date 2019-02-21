import axios from "axios";

export const COMMENTS_GET_START = "COMMENTS_GET_START";
export const COMMENTS_GET_COMPLETE = "COMMENTS_GET_COMPLETE";
export const COMMENTS_GET_ERROR = "COMMENTS_GET_ERROR";

export const getComments = id => {
  return dispatch => {
    dispatch({ type: COMMENTS_GET_START });
    axios
      .get(`https://production-taco.herokuapp.com/events/${id}/comments`)
      .then(res => {
        dispatch({
          type: COMMENTS_GET_COMPLETE,
          payload: res.data.comments_info
        });
      })
      .catch(err => {
        dispatch({ type: COMMENTS_GET_ERROR, payload: err });
      });
  };
};
