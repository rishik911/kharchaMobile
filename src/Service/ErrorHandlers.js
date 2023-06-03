import Toast from 'react-native-toast-message';
import {STATUS_CODE} from '../Utils/Constants';
import {store} from '../Redux/store';
import {initiateLogoutAction} from '../Modules/Auth/Redux/AuthActions';

export const handleError = (title, msg, status) => {
  let erroMessage = '';
  if (!msg?.message) {
    if (msg?.body && Array.isArray(msg?.body)) {
      erroMessage = msg?.body?.[0]?.message;
    }
  } else {
    erroMessage = msg?.message;
  }

  if (status === STATUS_CODE.EXPIRED) {
    store.dispatch(initiateLogoutAction());
  }

  Toast.show({
    type: 'error',
    text1: title,
    text2: erroMessage,
    position: 'bottom',
  });
};
