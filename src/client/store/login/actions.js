import * as types from './actionTypes';
import ApiService from '../../services/ApiService';

export const login = (payload) => (dispatch) => {
  return ApiService.post('/login', payload)
    .then(response => {
      dispatch({
        type: types.LOGIN_SUCCESSFULL,
        response: 'Logged in successfully'
      })
    });
}
