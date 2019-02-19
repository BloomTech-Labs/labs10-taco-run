import axios from "axios";

export const EVENTS_CREATE_START = "EVENTS_FETCH_START";
export const EVENTS_CREATE_COMPLETE = "EVENTS_FETCH_COMPLETE";
export const EVENTS_CREATE_ERROR = "EVENTS_FETCH_ERROR";

export const EVENT_DELETE_START = "EVENT_DELETE_START";
export const EVENT_DELETE_COMPLETE = "EVENT_DELETE_COMPLETE";
export const EVENT_DELETE_ERROR = "EVENT_DELETE_ERROR";

export const createEvent = () => {
  return dispatch => {
    dispatch({ type: EVENTS_CREATE_START });
    axios
      .get(`https://production-taco.herokuapp.com/users`)
      .then(res => {
        dispatch({ type: EVENTS_CREATE_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: EVENTS_CREATE_ERROR });
      });
  };
};

export const deleteEvent = event => {
  return dispatch => {
    dispatch({ type: EVENT_DELETE_START });
    axios
      .del(`https://production-taco.herokuapp.com/event/${event}`)
      .then(res => {
        dispatch({ type: EVENT_DELETE_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: EVENT_DELETE_ERROR });
      });
  };
};
