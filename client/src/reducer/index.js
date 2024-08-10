import { combineReducers } from 'redux';
import authReducer from './auth';
import noteReducer from './notes';
import folderReducer from './folder';

export default combineReducers({
    auth:authReducer,notes:noteReducer,folder:folderReducer
  });