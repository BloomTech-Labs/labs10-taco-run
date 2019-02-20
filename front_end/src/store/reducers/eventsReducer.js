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
  fetchingEvent: false,
  fetchedEvent: false,
  updatingEvent: false,
  updatedEvent: false,
  creatingEvent: false,
  createdEvent: false,
  deletingEvent: false,
  deletedEvent: false,
  error: null,
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS_GET_START:
      return {
        ...state,
        fetchingEvents: true,
        fetchedEvents: false
      };
      case EVENT_GET_START:
      return {
        ...state,
        fetchingEvent: true,
        fetchedEvent: false
      };

    case EVENTS_GET_COMPLETE:
      return {
        ...state,
        events: action.payload,
        fetchingEvents: false,
        fetchedEvents: true,
        error: null,
      };

      case EVENT_GET_COMPLETE:
      return {
        ...state,
        events: action.payload.event,
        fetchingEvent: false,
        fetchedEvent: true,
        error: null,
      };

    case EVENTS_GET_ERROR:
      return {
        ...state,
        error: "Error fetching events"
      };

      case EVENT_GET_ERROR:
      return {
        ...state,
        error: "Error fetching this event"
      };

    case EVENT_DELETE_START:
      return {
        ...state,
        deletingEvent: true
      };


    case EVENT_DELETE_COMPLETE:
      return {
        ...state,
        events: state.events.filter( each => each["id"] !== action.payload["id"]),
        deletingEvent: false,
        deletedEvent: true,
        error: null,
      };

    case EVENT_DELETE_ERROR:
      return {
        ...state,
        error: "Error deleting events"
      };

      case EVENTS_CREATE_START:
        return {
          ...state,
          creatingEvent: true,
          createdEvent: false,
        };
        
      case EVENTS_CREATE_COMPLETE:
        return {
          ...state,
          events: state.events.map( eachEvent => (
            eachEvent._id === action.payload.eachEvent._id ?
            action.payload.eachEvent :
            eachEvent
          )),
          creatingEvent: false,
          createdEvent: true,
          error: null,
        };
        case EVENTS_CREATE_ERROR:
        return {
          ...state,
          creatingEvent: false,
          createdEvent: false,
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
        events: state.events.map( eachOne => (
          eachOne.id === action.payload.eachOne.id ?
          action.payload.eachOne :
          eachOne
        )),
        updatingEvents: false,
        updatedEvents: true,
        error: null,
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
