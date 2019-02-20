import axios from "axios";

const BASE_URL='https://production-taco.herokuapp.com';

// export const getEvents = () => dispatch => {
//   dispatch({types: "EVENTS_GET_START"});
//   axios
//     .get(`https://production-taco.herokuapp.com/event/${event}`)
//     .then( res => {
//       dispatch({type: "EVENTS_GET_COMPLETE", payload: res.data
//       })
//     })
//     .catch( err => {
//       dispatch({type: "EVENTS_GET_ERROR", payload: err
//       })
//     })
// }

export const getEvent= (id) => dispatch => {
  dispatch({ type: "EVENT_GET_START" });

  axios
    .get(`${BASE_URL}/get/${id}`)
    .then( res => {
      dispatch({type: "EVENT_GET_COMPLETE", payload:  res.data
      })
    })
    .catch( err => {
      dispatch({type: "EVENT_GET_ERROR", payload: err})
    })
}

export const createEvent = () => {
  return dispatch => {
    dispatch({ type: "EVENTS_CREATE_START" });
    axios
      .post(`https://production-taco.herokuapp.com/events`)
      .then(res => {
        dispatch({ type: "EVENTS_CREATE_COMPLETE", payload: res.data });
      })
      .catch(err => {
        dispatch({ type: "EVENTS_CREATE_ERROR", payload: err });
      });
  };
};

export const deleteEvent = event => {
  return dispatch => {
    dispatch({ type: "EVENT_DELETE_START" });
    axios
      .del(`https://production-taco.herokuapp.com/event/${event}`)
      .then(res => {
        dispatch({ type: "EVENT_DELETE_COMPLETE", payload: res.data });
      })
      .catch(err => {
        dispatch({ type: "EVENT_DELETE_ERROR", payload: err });
      });
  };
};

// export const updateEvent = (event, id ) => {
//   return dispatch =>  {
//     dispatch => ({type: "UPDATE_EVENT_START"});
//     axios
//       .put(`https://production-taco.herokuapp.com/event/${id}`, event)
//       .then(res => {
//         dispatch({ type: "EVENT_UPDATE_COMPLETE", payload: res.data })
//       })
//       .catch(err => {
//         dispatch({
//           type: "EVENT_UPDATE_ERROR", payload: err
//          })
//       })
//   };
// };

