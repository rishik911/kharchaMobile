import {all, call, put, take, takeLatest} from 'redux-saga/effects';
import {makeGetCall, makePostCall} from '../../../Service/ApiService';
import {
  DEFAULT_HEADERS,
  ENDPOINTS,
  triggerSuccessToast,
} from '../../../Utils/Constants';
import {handleError} from '../../../Service/ErrorHandlers';
import {ERROR_MESSAGES} from '../../../Utils/Strings';
import {EXPENSE_TYPES} from './ExpenseTypes';

function* getExpensesData(action) {
  try {
    const headers = {...DEFAULT_HEADERS};
    headers.authorization = `Bearer ${action.accessToken}`;
    const response = yield call(makeGetCall, ENDPOINTS.EXPENSES, headers);

    if (response?.data?.status === 200) {
      const payload = response?.data?.body;
      yield put({
        type: EXPENSE_TYPES.GET_EXPENSE_DATA_SUCCESS,
        payload: payload,
      });
    }
  } catch (e) {
    handleError(
      ERROR_MESSAGES.SOMETHING_WRONG,
      e?.response?.data,
      e?.response?.status,
    );
  }
}

function* getMonthExpense(action) {
  try {
    const headers = {...DEFAULT_HEADERS};
    headers.authorization = `Bearer ${action.accessToken}`;
    const response = yield call(
      makeGetCall,
      `${ENDPOINTS.EXPENSES}/${action?.year}/${action?.month}`,
      headers,
    );

    if (response?.data?.status === 200) {
      const payload = response?.data?.body;
      yield put({
        type: EXPENSE_TYPES.GET_MONTH_EXPENSE_SUCCESS,
        payload: payload,
      });
    }
  } catch (e) {
    action.completeLoad(true);
    handleError(
      ERROR_MESSAGES.SOMETHING_WRONG,
      e?.response?.data,
      e?.response?.status,
    );
  }
}

function* postNewYearSaga(action) {
  try {
    const headers = {...DEFAULT_HEADERS};
    headers.authorization = `Bearer ${action.accessToken}`;
    const body = {
      year: action?.year,
    };
    const response = yield call(
      makePostCall,
      `${ENDPOINTS.NEW_YEAR}/`,
      body,
      headers,
    );

    if (response?.data?.status === 200) {
      const payload = response?.data?.body;
      action.completeLoad(true);
      triggerSuccessToast('New year has been added!');
      yield put({
        type: EXPENSE_TYPES.GET_EXPENSE_DATA,
        accessToken: action.accessToken,
      });
    }
  } catch (e) {
    action.completeLoad(false);
    handleError(
      ERROR_MESSAGES.SOMETHING_WRONG,
      e?.response?.data,
      e?.response?.status,
    );
  }
}

function* postNewMonthSaga(action) {
  try {
    const headers = {...DEFAULT_HEADERS};
    headers.authorization = `Bearer ${action.accessToken}`;
    const body = {
      year: action?.year,
      monthName: action?.monthName,
      total: 0,
    };
    const response = yield call(
      makePostCall,
      `${ENDPOINTS.NEW_MONTH}/`,
      body,
      headers,
    );

    if (response?.data?.status === 200) {
      const payload = response?.data?.body;
      action.completeLoad(true);
      triggerSuccessToast('New Month has been added!');
      yield put({
        type: EXPENSE_TYPES.GET_EXPENSE_DATA,
        accessToken: action.accessToken,
      });
    }
  } catch (e) {
    action.completeLoad(false);
    handleError(
      ERROR_MESSAGES.SOMETHING_WRONG,
      e?.response?.data,
      e?.response?.status,
    );
  }
}

function* postNewExpenseSaga(action) {
  try {
    const headers = {...DEFAULT_HEADERS};
    headers.authorization = `Bearer ${action.accessToken}`;
    const body = {
      year: action?.year,
      month: action?.monthName,
      expense: action.expense,
    };
    const response = yield call(
      makePostCall,
      `${ENDPOINTS.NEW_EXPENSE}`,
      body,
      headers,
    );

    if (response?.data?.status === 200) {
      const payload = response?.data?.body;
      action.completeLoad(true);
      triggerSuccessToast('New expense has been added!');
      yield put({
        type: EXPENSE_TYPES.GET_MONTH_EXPENSE,
        accessToken: action.accessToken,
        year: action.year,
        month: action.monthName,
      });
    }
  } catch (e) {
    action.completeLoad(false);
    e?.response?.status,
      handleError(
        ERROR_MESSAGES.SOMETHING_WRONG,
        e?.response?.data,
        e?.response?.status,
      );
  }
}

function* ExpenseSaga() {
  yield all([
    takeLatest(EXPENSE_TYPES.GET_EXPENSE_DATA, getExpensesData),
    takeLatest(EXPENSE_TYPES.GET_MONTH_EXPENSE, getMonthExpense),
    takeLatest(EXPENSE_TYPES.ADD_NEW_MONTH, postNewMonthSaga),
    takeLatest(EXPENSE_TYPES.ADD_NEW_YEAR, postNewYearSaga),
    takeLatest(EXPENSE_TYPES.ADD_NEW_EXPENSE, postNewExpenseSaga),
  ]);
}

export default ExpenseSaga;
