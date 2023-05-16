import {AUTH_ACTION_TYPES} from './ActionTypes';

const INITIAL_STATE = {
  accessToken: null,
  profileData: null,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload,
      };
    case AUTH_ACTION_TYPES.PROFILE_DATA_SUCCESS:
      return {
        ...state,
        profileData: action.payload,
      };
    case AUTH_ACTION_TYPES.LOGOUT_ACTION:
      return {
        ...state,
        accessToken: null,
        profileData: null,
      };
    default:
      return state;
  }
};
