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

const createReducer = (initialState, fnMap) => {
  return (state = initialState, {type, payload}) => {
    const handler = fnMap[type]
    return handler ? handler(state, payload): state
  }
}
  
export default createReducer(initialState, {
  ["CREATE_EVENT"]: createEvent,
  ["UPDATE_EVENT"]: updateEvent,
  ["DELETE_EVENT"]: deleteEvent
})
