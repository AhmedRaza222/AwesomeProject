import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import entrySlice from './entrySlice';
import exitSlice from './exitSlice';
import accountSlice from './accountSlice';

const appReducer = combineReducers({
  app: appSlice,
  entry: entrySlice,
  exit: exitSlice,
  account: accountSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
