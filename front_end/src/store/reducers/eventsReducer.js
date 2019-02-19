import {
  EVENTS_CREATE_START,
  EVENTS_CREATE_COMPLETE,
  EVENTS_CREATE_ERROR,
  EVENT_DELETE_START,
  EVENT_DELETE_COMPLETE,
  EVENT_DELETE_ERROR
} from "../actions/eventsActions";

const initialState = {
  events: [],
  fetchingEvents: false,
  fetchedEvents: false,

  deletingEvent: false,
  deletedEvent: false
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS_CREATE_START:
      return {
        ...state,
        fetchingEvents: true
      };

    case EVENTS_CREATE_COMPLETE:
      return {
        ...state,
        events: action.payload,
        fetchingEvents: false,
        fetchedEvents: true
      };

    case EVENT_DELETE_ERROR:
      return {
        ...state,
        error: "Error fetching events"
      };

    case EVENT_DELETE_START:
      return {
        ...state,
        deletingEvent: true
      };

    case EVENT_DELETE_COMPLETE:
      return {
        ...state,
        deletingEvent: false,
        deletedEvent: true
      };

    case EVENT_DELETE_ERROR:
      return {
        ...state,
        error: "Error deleting events"
      };

    default:
      return state;
  }
};

export default eventsReducer;
