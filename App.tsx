import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/Redux/store';
import NavWrapper from './src/Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import Toast, {ErrorToast} from 'react-native-toast-message';
import {LIGHT_COLORS} from './src/Common/Styles/Colors';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 16,
        color: LIGHT_COLORS.text,
        fontWeight: '600',
      }}
    />
  ),
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <NavWrapper />
          <Toast config={toastConfig} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
