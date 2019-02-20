import axios from "axios";

export const EVENTS_GET_START = "EVENTS_GET_START";
export const EVENTS_GET_COMPLETE = "EVENTS_GET_COMPLETE";
export const EVENTS_GET_ERROR = "EVENTS_GET_ERROR";

export const EVENT_GET_START = "EVENT_GET_START";
export const EVENT_GET_COMPLETE = "EVENT_GET_COMPLETE";
export const EVENT_GET_ERROR = "EVENT_GET_ERROR";

export const EVENT_DELETE_START = "EVENT_DELETE_START";
export const EVENT_DELETE_COMPLETE = "EVENT_DELETE_COMPLETE";
export const EVENT_DELETE_ERROR = "EVENT_DELETE_ERROR";

export const EVENT_UPDATE_START = "EVENT_UPDATE_START";
export const EVENT_UPDATE_COMPLETE = "EVENT_UPDATE_COMPLETE";
export const EVENT_UPDATE_ERROR = "EVENT_UPDATE_ERROR";

export const EVENTS_CREATE_START = "EVENTS_CREATE_START";
export const EVENTS_CREATE_COMPLETE = "EVENTS_CREATE_COMPLETE";
export const EVENTS_CREATE_ERROR = "EVENTS_CREATE_ERROR";

const BASE_URL = 'https://production-taco.herokuapp.com';

export const getEvents = () => dispatch => {
  dispatch({types:EVENTS_GET_START});
  axios
    .get(`https://production-taco.herokuapp.com/event`)
    .then( res => {
      dispatch({type: EVENTS_GET_COMPLETE, payload: res.data
      })
    })
    .catch( err => {
      dispatch({type: EVENTS_GET_ERROR, payload: err
      })
    })
}

export const getEvent = (id) => dispatch => {
  dispatch({ type: EVENT_GET_START });

  axios
    .get(`${BASE_URL}/get/${id}`)
    .then( res => {
      dispatch({type: EVENT_GET_COMPLETE, payload:  res.data
      })
    })
    .catch( err => {
      dispatch({type: EVENT_GET_ERROR, payload: err})
    })
}

export const createEvent = (event) => {
  return dispatch => {
    dispatch({ type: EVENTS_CREATE_START });
    axios
      .post(`https://production-taco.herokuapp.com/events`, event)
      .then(res => {       
        alert("event successfully made!");
        dispatch({ type: EVENTS_CREATE_COMPLETE, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: EVENTS_CREATE_ERROR, payload: err });
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
        dispatch({ type: EVENT_DELETE_ERROR, payload: err });
      });
  };
};

export const updateEvent = event => {
  return dispatch =>  {
    dispatch({type: EVENT_UPDATE_START});
    axios
      .put(`https://production-taco.herokuapp.com/event/${event}`)
      .then(res => {
        dispatch({ type:EVENT_UPDATE_COMPLETE, payload: res.data })
      })
      .catch(err => {
        dispatch({
          type: EVENT_UPDATE_ERROR, payload: err
         })
      })
  };
};
