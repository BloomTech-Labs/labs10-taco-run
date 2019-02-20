import {
  EVENTS_CREATE_START,
  EVENTS_CREATE_COMPLETE,
  EVENTS_CREATE_ERROR,
  EVENT_DELETE_START,
  EVENT_DELETE_COMPLETE,
  EVENT_DELETE_ERROR,
  EVENTS_UPDATE_START,
  EVENTS_UPDATE_COMPLETE,
  EVENTS_UPDATE_ERROR,
  EVENTS_GET_START,
  EVENTS_GET_COMPLETE,
  EVENTS_GET_ERROR,
  EVENT_GET_START,
  EVENT_GET_COMPLETE,
  EVENT_GET_ERROR
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
    case EVENTS_GET_START:
      return {
        ...state,
        fetchingEvents: true
      };

    case EVENTS_GET_COMPLETE:
      return {
        ...state,
        events: action.payload,
        fetchingEvents: false,
        fetchedEvents: true
      };

    case EVENTS_GET_ERROR:
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

      case EVENTS_UPDATE_START:
      return {
        ...state,
        events: action.payload,
        updatingEvents: true,
        // updatedEvents: false
      };

      case EVENTS_UPDATE_COMPLETE:
      return {
        ...state,
        events: action.payload,
        updatingEvents: false,
        updatedEvents: true
      };

      case EVENTS_UPDATE_ERROR:
        return {
          ...state,
          error: "Error updating Events"
        }

    default:
      return state;
  }
};

export default eventsReducer;
