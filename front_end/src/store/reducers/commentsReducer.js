import {
  COMMENTS_GET_START,
  COMMENTS_GET_COMPLETE,
  COMMENTS_GET_ERROR
} from "../actions/commentsActions";

const initialState = {
  comments: [],
  fetchingComments: false,
  fetchedComments: false,
  error: null
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_GET_START:
      return {
        ...state,
        fetchingEvents: true,
        fetchedEvents: false
      };
    case COMMENTS_GET_COMPLETE:
      return {
        ...state,
        comments: action.payload,
        fetchingEvents: false,
        fetchedEvents: true,
        error: null
      };

    case COMMENTS_GET_ERROR:
      return {
        ...state,
        error: "Error fetching events"
      };

    default:
      return state;
  }
};

export default eventsReducer;
