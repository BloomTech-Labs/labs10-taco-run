import axios from "axios";

export const COMMENTS_GET_START = "COMMENTS_GET_START";
export const COMMENTS_GET_COMPLETE = "COMMENTS_GET_COMPLETE";
export const COMMENTS_GET_ERROR = "COMMENTS_GET_ERROR";
export const MAKE_COMMENT_START = "MAKE_COMMENT_START";
export const MAKE_COMMENT_COMPLETE = "MAKE_COMMENT_COMPLETE";
export const MAKE_COMMENT_ERROR = "MAKE_COMMENT_ERROR"

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

export const makeComment = comment => {
  return dispatch => {
    dispatch({type: MAKE_COMMENT_START});
    axios
      .post(`https://production-taco.herokuapp.com/comments`, comment)
      .then(res => {
        let obj = JSON.parse(res.config.data);
        dispatch({
          type: MAKE_COMMENT_COMPLETE,
          payload: obj
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({type: MAKE_COMMENT_ERROR, payload: err})
      })
  }
}
