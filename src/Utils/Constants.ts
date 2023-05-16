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
};
