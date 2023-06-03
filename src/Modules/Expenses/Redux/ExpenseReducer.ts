import {getYearsData} from '../Utils/Helpers';
import {EXPENSE_TYPES} from './ExpenseTypes';

const INITIAL_STATE = {
  expenseData: null,
  monthExpense: null,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case EXPENSE_TYPES.GET_EXPENSE_DATA_SUCCESS:
      return {
        ...state,
        expenseData: action.payload?.years,
      };
    case EXPENSE_TYPES.GET_MONTH_EXPENSE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        monthExpense: action.payload,
      };
    case EXPENSE_TYPES.CLEAR_MONTH_EXPENSE:
      return {
        ...state,
        monthExpense: null,
      };
    default:
      return state;
  }
};
