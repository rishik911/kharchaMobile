import React, {useEffect} from 'react';
import {MonthExpenseTypes} from '../../types';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearMonthExpenseAction} from '../Redux/ExpenseActions';

const MonthExpense: React.FC<MonthExpenseTypes> = ({}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      console.log('called');
      dispatch(clearMonthExpenseAction());
    };
  }, []);
  return (
    <View>
      <Text>Month details</Text>
    </View>
  );
};

export default MonthExpense;
