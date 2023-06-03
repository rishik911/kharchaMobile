import React, {useMemo} from 'react';
import {ExpenseListItemTypes} from '../../../types';
import {View, Text} from 'react-native';
import getCommonStyles from '../../../../Common/Styles';
import {expenseItemStyles} from '../../styles/ExpenseitemStyles';
import dayjs from 'dayjs';
import {THEME} from '../../../../Common/Styles/Colors';

const ExpenseListItem: React.FC<ExpenseListItemTypes> = ({
  spendBy,
  amount,
  date,
  type,
  index,
  isHeader = false,
}) => {
  const {textColor} = getCommonStyles();

  const getDate = useMemo(() => {
    if (!isHeader) {
      return dayjs(new Date(date)).format('MMM DD');
    } else return date;
  }, [date, isHeader]);

  const getBackgroundColor = useMemo(() => {
    if (isHeader) return THEME.BG;
    else {
      return index % 2 === 0 ? '#fff' : THEME.BG;
    }
  }, [isHeader, index]);
  return (
    <View
      style={[
        expenseItemStyles?.container,
        {backgroundColor: getBackgroundColor},
      ]}>
      <View style={expenseItemStyles?.spendBy}>
        <Text
          style={[
            textColor,
            expenseItemStyles?.fontStyle,
            {fontWeight: isHeader ? '600' : '400'},
          ]}>
          {spendBy}
        </Text>
      </View>
      <View style={expenseItemStyles?.expenseType}>
        <Text
          style={[
            textColor,
            expenseItemStyles?.fontStyle,
            {fontWeight: isHeader ? '600' : '400'},
          ]}>
          {type}
        </Text>
      </View>
      <View style={expenseItemStyles?.amount}>
        <Text
          style={[
            textColor,
            expenseItemStyles?.fontStyle,
            {fontWeight: isHeader ? '600' : '400'},
          ]}>
          {amount}
        </Text>
      </View>
      <View style={expenseItemStyles?.spentOn}>
        <Text
          style={[
            textColor,
            expenseItemStyles?.fontStyle,
            {fontWeight: isHeader ? '600' : '400'},
          ]}>
          {getDate}
        </Text>
      </View>
    </View>
  );
};

export default ExpenseListItem;
