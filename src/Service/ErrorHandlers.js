import Toast from 'react-native-toast-message';

export const handleError = (title, msg) => {
  let erroMessage = '';
  if (!msg?.message) {
    if (msg?.body && Array.isArray(msg?.body)) {
      erroMessage = msg?.body?.[0]?.message;
    }
  } else {
    erroMessage = msg?.message;
  }
  Toast.show({
    type: 'error',
    text1: title,
    text2: erroMessage,
    position: 'bottom',
  });
};
