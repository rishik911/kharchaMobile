import {all, call, put, take, takeLatest} from 'redux-saga/effects';
import {
  makeGetCall,
  makePostCall,
  makePutCall,
} from '../../../Service/ApiService';
import {DEFAULT_HEADERS, ENDPOINTS} from '../../../Utils/Constants';
import reactotron from 'reactotron-react-native';
import {AUTH_ACTION_TYPES} from './ActionTypes';
import {handleError} from '../../../Service/ErrorHandlers';
import {ERROR_MESSAGES} from '../../../Utils/Strings';

function* initiateSignupSaga(action) {
  try {
    const params = {
      email: action.email,
      password: action.password,
      firstName: action.firstName,
      lastName: action.lastName,
    };

    const response = yield call(makePostCall, ENDPOINTS.SIGN_UP, params);

    if (response?.data?.status === 200) {
      yield put({
        type: AUTH_ACTION_TYPES.INITATE_LOGIN,
        email: action.email,
        password: action.password,
        completeLoad: () => {},
      });
      action.completeLoad(true);
    }
  } catch (e) {
    action.completeLoad(true);
    handleError(ERROR_MESSAGES.SOMETHING_WRONG, e?.response?.data);
  }
}

function* initiateLoginSaga(action) {
  try {
    const params = {
      email: action.email,
      password: action.password,
    };
    const response = yield call(makePostCall, ENDPOINTS.LOGIN, params);

    if (response?.data?.status === 200) {
      const payload = response?.data?.body?.token;
      yield put({
        type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
        payload: payload,
      });
      yield put({
        type: AUTH_ACTION_TYPES.GET_PROFILE_DATA,
        accessToken: payload,
      });
      action?.completeLoad(true);
    }
  } catch (e) {
    action?.completeLoad(true);
    handleError(ERROR_MESSAGES.SOMETHING_WRONG, e?.response?.data);
  }
}

function* getProfileDataSaga(action) {
  try {
    const headers = {...DEFAULT_HEADERS};
    headers.authorization = `Bearer ${action.accessToken}`;
    const response = yield call(makeGetCall, ENDPOINTS.PROFILE, headers);

    if (response?.data?.status === 200) {
      const payload = response?.data?.body;
      yield put({
        type: AUTH_ACTION_TYPES.PROFILE_DATA_SUCCESS,
        payload: payload,
      });
    }
  } catch (e) {
    handleError(ERROR_MESSAGES.SOMETHING_WRONG, e?.response?.data);
  }
}

function* updateProfileSaga(action) {
  try {
    const headers = {...DEFAULT_HEADERS};
    headers.authorization = `Bearer ${action.accessToken}`;
    const response = yield call(
      makePutCall,
      ENDPOINTS.PROFILE,
      action.data,
      headers,
    );

    if (response?.data?.status === 200) {
      const payload = response?.data?.body;
      yield put({
        type: AUTH_ACTION_TYPES.GET_PROFILE_DATA,
        accessToken: action.accessToken,
      });
      action.completeLoad(true);
    }
  } catch (e) {
    action.completeLoad(false);
    handleError(ERROR_MESSAGES.SOMETHING_WRONG, e?.response?.data);
  }
}

function* AuthSaga() {
  yield all([
    takeLatest(AUTH_ACTION_TYPES.INTIATE_SIGNUP, initiateSignupSaga),
    takeLatest(AUTH_ACTION_TYPES.INITATE_LOGIN, initiateLoginSaga),
    takeLatest(AUTH_ACTION_TYPES.GET_PROFILE_DATA, getProfileDataSaga),
    takeLatest(AUTH_ACTION_TYPES.UPDATE_PROFILE, updateProfileSaga),
  ]);
}

export default AuthSaga;
