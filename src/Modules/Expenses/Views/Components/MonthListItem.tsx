import React from 'react';
import {MonthListItemTypes} from '../../../types';
import {View, TouchableOpacity, Text} from 'react-native';
import getCommonStyles from '../../../../Common/Styles';
import {expenseStyles} from '../../styles/ExpenseStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const MonthListItem: React.FC<MonthListItemTypes> = ({
  monthName,
  totalSpent,
  id,
  handleOnMonthPress,
}) => {
  const {listItemCard, listCardText} = getCommonStyles();

  const handleOnPress = () => {
    handleOnMonthPress(monthName);
  };

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={[listItemCard, expenseStyles?.monthCard]}>
      <View>
        <Text style={[listCardText, expenseStyles?.monthName]}>
          {monthName?.toUpperCase()}
        </Text>
        <View style={expenseStyles?.rowRender}>
          <Icon name="inr" {...listCardText} size={18} />
          <Text style={[listCardText, expenseStyles?.total]}>{totalSpent}</Text>
        </View>
      </View>
      <View></View>
    </TouchableOpacity>
  );
};

export default MonthListItem;
