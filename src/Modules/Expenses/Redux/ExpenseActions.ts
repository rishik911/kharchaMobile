import {EXPENSE_TYPES} from './ExpenseTypes';

export const getExpenseDataAction = (accessToken: string) => {
  return {
    type: EXPENSE_TYPES.GET_EXPENSE_DATA,
    accessToken,
  };
};

export const getMonthlyExpenseAction = (
  accessToken: string,
  year: string,
  month: string,
  completeLoad: any,
) => {
  return {
    type: EXPENSE_TYPES.GET_MONTH_EXPENSE,
    accessToken,
    year,
    month,
    completeLoad,
  };
};

export const clearMonthExpenseAction = () => {
  return {
    type: EXPENSE_TYPES.CLEAR_MONTH_EXPENSE,
  };
};

export const postNewYearAction = (
  accessToken: string,
  year: string,
  completeLoad: any,
) => {
  return {
    type: EXPENSE_TYPES.ADD_NEW_YEAR,
    accessToken,
    year,
    completeLoad,
  };
};

export const postNewMonthAction = (
  accessToken: string,
  year: string,
  monthName: string,
  completeLoad: any,
) => {
  return {
    type: EXPENSE_TYPES.ADD_NEW_MONTH,
    accessToken,
    year,
    monthName,
    completeLoad,
  };
};
