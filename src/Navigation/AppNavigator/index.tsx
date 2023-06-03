import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileIndex from '../../Modules/Profile/Views';
import ExpenseStack from './ExpenseNavigator';
import CustomDrawerContent from '../DrawerComponents/CustomComponent';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Expenses"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShadowVisible: true,
        headerShown: false,
      }}>
      <Drawer.Screen name="Expenses" component={ExpenseStack} />
      <Drawer.Screen name="Profile" component={ProfileIndex} />
    </Drawer.Navigator>
  );
}
