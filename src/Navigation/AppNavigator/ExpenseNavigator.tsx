import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../../Modules/Auth/Views/Signup';
import Login from '../../Modules/Auth/Views/Login';
import {AUTH_SCREENS, EXPENSE_SCREENS} from '../../Utils/Constants';
import ExpensesIndex from '../../Modules/Expenses/Views';
import MonthExpense from '../../Modules/Expenses/Views/MonthExpense';

const Stack = createStackNavigator();

function ExpenseStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={EXPENSE_SCREENS.EXPENSE_INDEX}
        component={ExpensesIndex}
      />
      <Stack.Screen
        name={EXPENSE_SCREENS.MONTH_EXPENSE}
        component={MonthExpense}
      />
    </Stack.Navigator>
  );
}
export default ExpenseStack;
