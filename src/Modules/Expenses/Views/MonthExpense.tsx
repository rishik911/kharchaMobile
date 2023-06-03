import React, {useEffect, useMemo, useState} from 'react';
import {MonthExpenseTypes} from '../../types';
import {View, TouchableOpacity, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearMonthExpenseAction} from '../Redux/ExpenseActions';
import Header from '../../../Common/Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {expenseStyles} from '../styles/ExpenseStyles';
import getCommonStyles from '../../../Common/Styles';
import AddExpenseModal from './Components/AddExpenseModal';
import ExpenseListItem from './Components/ExpenseListItem';
import {geneateMemberExpenses} from '../Utils/Helpers';
import {expenseItemStyles} from '../styles/ExpenseitemStyles';
import {RefreshControl} from 'react-native-gesture-handler';

const MonthExpense: React.FC<MonthExpenseTypes> = (props, {}) => {
  const dispatch = useDispatch();

  const {profileData} = useSelector(state => state.authState);

  const {monthExpense} = useSelector(state => state.expenseState);

  const [showAddModal, setAddModal] = useState(false);

  const {containerBackground} = getCommonStyles();

  const {yearId, accessToken} = props?.route?.params;

  useEffect(() => {
    return () => {
      //   dispatch(clearMonthExpenseAction());
    };
  }, []);

  const {textColor} = getCommonStyles();

  const handleAddIcon = () => setAddModal(true);

  const handleModalVisibility = () => setAddModal(false);

  const renderExpense = ({item, index}) => {
    return (
      <ExpenseListItem
        spendBy={item?.spendBy}
        amount={item?.amount}
        index={index}
        type={item?.expenseType}
        date={item?.spendOn}
      />
    );
  };

  const renderAmountRender = (
    item1: string,
    item2: string | number,
    renderIcon: boolean = false,
  ) => {
    return (
      <View style={expenseStyles?.rowContainer}>
        <Text
          style={[
            textColor,
            expenseItemStyles?.fontStyle,
            {fontWeight: '600'},
          ]}>
          {item1}
        </Text>
        <View style={expenseStyles?.rowContainer}>
          {renderIcon && <Icon name="inr" {...textColor} size={14} />}
          <Text
            style={[
              textColor,
              expenseItemStyles?.fontStyle,
              {fontWeight: '600', bottom: 2},
            ]}>
            {item2}
          </Text>
        </View>
      </View>
    );
  };

  const memberData = useMemo(() => {
    const {expenseDetails} = monthExpense;
    const arr = geneateMemberExpenses(expenseDetails);
    return arr;
  }, [monthExpense]);

  console.log(monthExpense);

  const renderListHeader = () => {
    return (
      <View style={expenseStyles?.headerContainer}>
        {renderAmountRender('Total', monthExpense?.total, true)}
        <View style={expenseStyles?.horizontalLine} />
        {renderAmountRender('Member name', 'Amount')}

        <View style={expenseStyles?.gap} />
        {memberData?.map(curr =>
          renderAmountRender(curr.name, curr.amount, true),
        )}
      </View>
    );
  };

  return (
    <View style={[containerBackground, expenseStyles.mainContainer]}>
      <Header
        headerTitle={monthExpense?.monthName?.toUpperCase()}
        showBack
        navigation={props?.navigation}
      />

      {renderListHeader()}
      {monthExpense?.expenseDetails?.length > 0 && (
        <ExpenseListItem
          spendBy="Spent by"
          amount="Amout"
          type="Expense type"
          date="Spent on"
          index={0}
          isHeader={true}
        />
      )}
      <FlatList
        data={monthExpense?.expenseDetails}
        renderItem={renderExpense}
      />
      <TouchableOpacity
        onPress={handleAddIcon}
        style={expenseStyles?.plusHolder}>
        <Icon name="plus" size={30} color="#000" />
      </TouchableOpacity>
      <AddExpenseModal
        yearId={yearId}
        monthName={monthExpense?.monthName}
        isVisible={showAddModal}
        handleVisibility={handleModalVisibility}
        accessToken={accessToken}
        groupName={profileData?.groupName}
      />
    </View>
  );
};

export default MonthExpense;
