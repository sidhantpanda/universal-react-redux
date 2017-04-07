import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
// import { pagination } from 'violet-paginator';

import auth from './auth';
import {reducer as form} from 'redux-form';
import testReducer from './testReducer';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  testReducer
});
