import {combineReducers} from 'redux';
import AuthReducer from '../Modules/Auth/Redux/AuthReducer';
import ExpenseReducer from '../Modules/Expenses/Redux/ExpenseReducer';

const appReducer = combineReducers({
  authState: AuthReducer,
  expenseState: ExpenseReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
