import React from 'react';
import {Text} from 'react-native';
import store from '../Redux/store';
import {useSelector} from 'react-redux';
import AppNavigator from './AppNavigator';
import AuthRootStack from './RootStack';

const NavWrapper = () => {
  const AuthState = useSelector(state => state.authState);

  console.log(AuthState);

  const {accessToken} = AuthState;

  if (accessToken) {
    return <AppNavigator />;
  } else return <AuthRootStack />;
};

export default NavWrapper;
