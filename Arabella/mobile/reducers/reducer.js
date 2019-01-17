import {includesObject} from "../utils/calendar-utils";

export const calendarReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      const dateString = action.payload.date.split('T')[0];
      if(dateString in state) {
        if(!includesObject(state[dateString], action.payload))
          state[dateString].push(action.payload);
      }
      else {
        state[dateString] = [];
        state[dateString].push(action.payload);
      }
      return state;

    case 'ADD_KEY_WITHOUT_VALUE':
      if(!(action.payload in state)) {
        state[action.payload] = [];
        return state;
      }
      else
        return state;


    default:
      return state;
  }
};