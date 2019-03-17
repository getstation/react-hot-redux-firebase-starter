import { combineReducers } from 'redux';

import user from './userReducer';
import message from './messageReducer';
import routesPermissions from './routesPermissionsReducer';
import auth from './authReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  routesPermissions,
  user,
  message,
  auth,
  ajaxCallsInProgress
});

export default rootReducer;
