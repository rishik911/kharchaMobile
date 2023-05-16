import {combineReducers} from 'redux';
import AuthReducer from '../Modules/Auth/Redux/AuthReducer';

const appReducer = combineReducers({
  authState: AuthReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
