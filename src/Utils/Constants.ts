import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const BASE_URL = 'https://kharcha-api-production.up.railway.app';

export const DEFAULT_HEADERS = {
  'Content-Type': 'Application/json',
};

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const AUTH_SCREENS = {
  SIGN_UP: 'signUp',
  LOGIN: 'logIN',
};

export const ENDPOINTS = {
  SIGN_UP: '/v1/auth/signUp',
  LOGIN: '/v1/auth/login',
  PROFILE: '/v1/auth/profile',
  EXPENSES: '/v1/expense/',
  NEW_YEAR: '/v1/expense/year',
  NEW_EXPENSE: '/v1/expense/createExpense',
  NEW_MONTH: '/v1/expense/month',
};

export const EXPENSE_SCREENS = {
  EXPENSE_INDEX: 'expenseIndex',
  MONTH_EXPENSE: 'monthlyExpense',
};

export const triggerSuccessToast = (message: string) => {
  Toast.show({
    type: 'success',
    text1: message,
    position: 'top',
  });
};

export const STATUS_CODE = {
  EXPIRED: 405,
};
