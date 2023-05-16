import {all} from 'redux-saga/effects';
import AuthSaga from '../Modules/Auth/Redux/AuthSaga';

export default function* IndexSaga() {
  yield all([AuthSaga()]);
}
