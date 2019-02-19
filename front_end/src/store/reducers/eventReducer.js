import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from './eventConstants';

const initialState = [];



export const createEvent = (state, payload) => {
    return [...state, Object.assign({}, payload.event)]
  }
  
  export const updateEvent = (state, payload) => {
    return [
      ...state.filter(event => event.id !== payload.event.id),
      Object.assign({}, payload.event)
    ]
  }
  
  export const deleteEvent = (state, payload) => {
    return [
      ...state.filter(event => event.id !== payload.eventId)
    ]
  }
  
  export default createReducer(initialState, {
    [CREATE_EVENT]: createEvent,
    [UPDATE_EVENT]: updateEvent,
    [DELETE_EVENT]: deleteEvent
  })

  createReducer = (initialState, fnMap) => {
    return (state = initialState, {type, payload}) => {
      const handler = fnMap[type];
  
      return handler ? handler(state, payload): state
    };