import React from 'react';
import {useSelector} from 'react-redux';
import AppNavigator from './AppNavigator';
import AuthRootStack from './RootStack';

const NavWrapper = () => {
  const AuthState = useSelector(state => state.authState);

  const {accessToken} = AuthState;

  if (accessToken) {
    return <AppNavigator />;
  } else return <AuthRootStack />;
};

export default NavWrapper;
