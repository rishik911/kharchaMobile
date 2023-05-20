import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileIndex from '../../Modules/Profile/Views';
import ExpenseStack from './ExpenseNavigator';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Expenses"
      screenOptions={{
        headerShadowVisible: true,
        headerShown: false,
      }}>
      <Drawer.Screen name="Expenses" component={ExpenseStack} />
      <Drawer.Screen name="Profile" component={ProfileIndex} />
    </Drawer.Navigator>
  );
}
