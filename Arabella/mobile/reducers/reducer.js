import { Map, OrderedMap } from 'immutable';
import { combineReducers } from 'redux';

const EVENTS_INITIAL_STATE = {
  events: {}
};

const calendarReducer = (state = EVENTS_INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_EVENT':
      const { events } = state;
      Object.keys(action.payload).forEach(key => events[key] = action.payload[key]);
      return { events };

    default:
      return state
  }
};

const USER_INITIAL_STATE = Map({
  info: Map(),
  role: null,
  school: null
});

const userReducer = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_USER_INFO':
      return state.set("info", action.payload);

    case 'ADD_USER_ROLE':
      return state.set("role", action.payload);

    case 'ADD_USER_SCHOOL':
      return state.set("school", action.payload);

    default:
      return state
  }
};

export default combineReducers({
  calendarEvents: calendarReducer,
  user: userReducer
});