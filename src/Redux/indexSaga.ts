import {all} from 'redux-saga/effects';
import AuthSaga from '../Modules/Auth/Redux/AuthSaga';
import ExpenseSaga from '../Modules/Expenses/Redux/ExpenseSaga';

export default function* IndexSaga() {
  yield all([AuthSaga(), ExpenseSaga()]);
}
