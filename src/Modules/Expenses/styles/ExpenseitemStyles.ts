import {StyleSheet} from 'react-native';

export const expenseItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  spendBy: {
    flex: 0.2,
  },
  expenseType: {
    flex: 0.4,
  },
  amount: {
    flex: 0.2,
  },
  spentOn: {
    flex: 0.2,
  },
  fontStyle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
