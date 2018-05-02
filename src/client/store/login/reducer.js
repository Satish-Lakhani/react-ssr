import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isLoggedIn: undefined
});

export default function reduce(state = initialState, action = {}) {
  switch(action.type) {
    case types.LOGIN_SUCCESSFULL:
      return state.merge({
        isLoggedIn: true
      });

    case types.LOGIN_FAILED:
      Alert.error(action.error);
      return state.merge({
        isLoggedIn: false,
        error: action.error
      });

    default:
      return state;
  }
}

// selectors
export function getLoginStatus(state) {
  return state.login;
}
