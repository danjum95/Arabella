import {combineReducers} from 'redux';

const INITIAL_STATE = {
  events: {}
};

const calendarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_EVENT':
      const { events } = state;
      Object.keys(action.payload).forEach(key => events[key] = action.payload[key]);
      return { events };

    default:
      return state
  }
};

export default combineReducers({
  calendarEvents: calendarReducer,
});