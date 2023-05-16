import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../../Modules/Auth/Views/Signup';
import Login from '../../Modules/Auth/Views/Login';
import {AUTH_SCREENS} from '../../Utils/Constants';

const Stack = createStackNavigator();

function AuthRootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={AUTH_SCREENS.SIGN_UP} component={Signup} />
      <Stack.Screen name={AUTH_SCREENS.LOGIN} component={Login} />
    </Stack.Navigator>
  );
}
export default AuthRootStack;
