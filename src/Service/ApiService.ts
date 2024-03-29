import axios from 'axios';
import {BASE_URL, DEFAULT_HEADERS} from '../Utils/Constants';
import reactotron from 'reactotron-react-native';

export const makePostCall = async (
  endpoint: string,
  params: Object,
  reqHeaders: any = DEFAULT_HEADERS,
) => {
  const response = await axios.post(`${BASE_URL}${endpoint}`, params, {
    headers: reqHeaders,
  });
  return response;
};

export const makeGetCall = async (
  endpoint: string,
  reqHeaders: any = DEFAULT_HEADERS,
) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`, {
    headers: reqHeaders,
  });
  return response;
};

export const makePutCall = async (
  endpoint: string,
  params: Object,
  reqHeaders: any = DEFAULT_HEADERS,
) => {
  const response = await axios.put(`${BASE_URL}${endpoint}`, params, {
    headers: reqHeaders,
  });
  return response;
};
