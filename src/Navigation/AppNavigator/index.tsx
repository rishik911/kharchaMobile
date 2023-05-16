import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileIndex from '../../Modules/Profile/Views';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="ProfileIndex" component={ProfileIndex} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
