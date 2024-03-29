import {EXPENSE_TYPES} from './ExpenseTypes';

export const getExpenseDataAction = (
  accessToken: string,
  groupName: string,
) => {
  return {
    type: EXPENSE_TYPES.GET_EXPENSE_DATA,
    accessToken,
    groupName,
  };
};

export const getMonthlyExpenseAction = (
  accessToken: string,
  year: string,
  month: string,
  completeLoad: any,
  groupName: string,
) => {
  console.log(groupName)
  return {
    type: EXPENSE_TYPES.GET_MONTH_EXPENSE,
    accessToken,
    year,
    month,
    completeLoad,
    groupName,
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
  groupName: string,
) => {
  return {
    type: EXPENSE_TYPES.ADD_NEW_YEAR,
    accessToken,
    year,
    completeLoad,
    groupName,
  };
};

export const postNewMonthAction = (
  accessToken: string,
  year: string,
  monthName: string,
  completeLoad: any,
  groupName: string,
) => {
  return {
    type: EXPENSE_TYPES.ADD_NEW_MONTH,
    accessToken,
    year,
    monthName,
    completeLoad,
    groupName,
  };
};

export const addNewExpenseAction = (
  accessToken: string,
  year: string,
  monthName: string,
  expense: object,
  completeLoad: any,
  groupName: string,
) => {
  return {
    type: EXPENSE_TYPES.ADD_NEW_EXPENSE,
    accessToken,
    year,
    monthName,
    expense,
    completeLoad,
    groupName,
  };
};
