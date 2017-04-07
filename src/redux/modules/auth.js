const LOAD = 'universal-react-redux/auth/LOAD';
const LOAD_SUCCESS = 'universal-react-redux/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'universal-react-redux/auth/LOAD_FAIL';

const LOGIN = 'universal-react-redux/auth/LOGIN';
const LOGIN_SUCCESS = 'universal-react-redux/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'universal-react-redux/auth/LOGIN_FAIL';

const LOGOUT = 'universal-react-redux/auth/LOGOUT';
const LOGOUT_SUCCESS = 'universal-react-redux/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'universal-react-redux/auth/LOGOUT_FAIL';

const SIGN_UP_LOCAL = 'universal-react-redux/auth/SIGN_UP_LOCAL';
const SIGN_UP_LOCAL_SUCCESS = 'universal-react-redux/auth/SIGN_UP_LOCAL_SUCCESS';
const SIGN_UP_LOCAL_FAIL = 'universal-react-redux/auth/SIGN_UP_LOCAL_FAIL';

import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  loaded: false,
  user: null
};

let tokenCopy; // Keep a copy

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REHYDRATE:
      const incoming = action.payload.auth;
      if (incoming !== undefined && incoming !== null) {
        if (incoming.token !== undefined && incoming.token !== null) {
          tokenCopy = incoming.token;
        }
        console.log('ok');
      }
      if (incoming) {
        return {
          ...state,
          ...incoming,
          signUpLocalError: undefined,
          loginError: undefined
        };
      }
      return state;
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      tokenCopy = action.result.token;
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: action.result.user,
        token: action.result.token
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case SIGN_UP_LOCAL:
      return {
        ...state,
        signingUpLocal: true
      };
    case SIGN_UP_LOCAL_SUCCESS:
      tokenCopy = action.result.token;
      return {
        ...state,
        signingUpLocal: false,
        signedUpLocal: true,
        user: action.result.user,
        token: action.result.token
      };
    case SIGN_UP_LOCAL_FAIL:
      return {
        ...state,
        signingUpLocal: false,
        signedUpLocal: false,
        signUpLocalError: action.error
      };
    default:
      return state;
  }
}

export function getApiKey() {
  if (tokenCopy === null) {
    return '';
  }
  return tokenCopy.key;
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/user/loadAuth')
  };
}

export function loginLocal(user) {
  const { username, password } = user;
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/user/login', {
      data: {
        username: username,
        password: password
      }
    })
  };
}

export function signUpLocal(user) {
  const { name, username, email, password } = user;
  return {
    types: [SIGN_UP_LOCAL, SIGN_UP_LOCAL_SUCCESS, SIGN_UP_LOCAL_FAIL],
    promise: (client) => client.post('/user/signup', {
      data: {
        name: name,
        username: username,
        email: email,
        password: password
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/user/logout')
  };
}
