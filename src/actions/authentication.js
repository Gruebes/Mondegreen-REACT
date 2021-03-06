import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';

// Action Creators
export const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
export const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
export const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
export const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });
export const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
export const registrationAttempt = () => ({ type: 'AUTHENTICATION_REGISTRATION_ATTEMPT' });
export const registrationFailure = error => ({ type: 'AUTHENTICATION_REGISTRATION_FAILURE', error });
export const registrationSuccess = json => ({ type: 'AUTHENTICATION_REGISTRATION_SUCCESS', json });
export const sessionCheckFailure = () => ({ type: 'AUTHENTICATION_SESSION_CHECK_FAILURE' });
export const sessionCheckSuccess = json => ({ type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json });

// Log user In
export function logUserIn(userData) {
  return async (dispatch) => {
    // turn on spinnerrs
    dispatch(incrementProgress());

    // register that a login attempt is being made
    dispatch(loginAttempt());

    // contact login API
    await fetch(
      // where to contact
      '/api/authentication/login',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json) {
        dispatch(loginSuccess(json));
      } else {
        dispatch(loginFailure(new Error('Authentication Failed')));
      }
    })
    .catch((error) => {
      dispatch(loginFailure(new Error(error)));
    });

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// Log User Out
export function logUserOut() {
  return async (dispatch) => {
    // turn on spinner
    dispatch(incrementProgress());

    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/logout',
      // what to send
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        dispatch(logoutSuccess());
      } else {
        dispatch(logoutFailure(`Error: ${response.status}`));
      }
    })
    .catch((error) => {
      dispatch(logoutFailure(error));
    });

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// Register User
export function registerUser(userData) {
  return async (dispatch) => {
    // turn on spinnerrs
    dispatch(incrementProgress());

    // register that a registration attempt is being made
    dispatch(registrationAttempt());

    // contact registeration API
    await fetch(
      // where to contact
      '/api/authentication/register',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json) {
        dispatch(registrationSuccess(json));
      } else {
        dispatch(registrationFailure(new Error('Registration Failed')));
      }
    })
    .catch((error) => {
      dispatch(registrationFailure(new Error(error)));
    });

    // turn off spinner
    return dispatch(decrementProgress());
  };
}
