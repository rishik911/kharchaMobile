import {AUTH_ACTION_TYPES} from './ActionTypes';

export const initiateLogoutAction = () => {
  return {
    type: AUTH_ACTION_TYPES.LOGOUT_ACTION,
  };
};

export const initiateSignUpAction = (
  email: string,
  password: string,
  completeLoad: any,
) => {
  return {
    type: AUTH_ACTION_TYPES.INTIATE_SIGNUP,
    email,
    password,
    completeLoad,
  };
};

export const initiateLoginAction = (
  email: string,
  password: string,
  completeLoad: any,
) => {
  return {
    type: AUTH_ACTION_TYPES.INITATE_LOGIN,
    email,
    password,
    completeLoad,
  };
};

export const getProfileDataAction = (accessToken: string) => {
  return {
    type: AUTH_ACTION_TYPES.GET_PROFILE_DATA,
    accessToken,
  };
};
