import React, {useEffect, useMemo, useState} from 'react';
import {ExpensesIndexTypes} from '../../types';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import getCommonStyles from '../../../Common/Styles';
import {expenseStyles} from '../styles/ExpenseStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getExpenseDataAction,
  getMonthlyExpenseAction,
} from '../Redux/ExpenseActions';
import {getMonthsData, getYearsData} from '../Utils/Helpers';
import MonthListItem from './Components/MonthListItem';
import {EXPENSE_SCREENS} from '../../../Utils/Constants';
import Loader from '../../../Common/Components/Loader';
import Header from '../../../Common/Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddModal from './Components/AddModal';

const ExpensesIndex: React.FC<ExpensesIndexTypes> = (props, {}) => {
  const dispatch = useDispatch();

  const {expenseData, monthExpense} = useSelector(state => state.expenseState);

  const {accessToken} = useSelector(state => state.authState);

  const [selectedYear, setSelectedYear] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const {containerBackground} = getCommonStyles();
  const [showLoader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getExpenseDataAction(accessToken));
  }, []);

  useEffect(() => {
    if (expenseData?.length > 0 && !selectedYear) {
      setSelectedYear(expenseData?.[0]?.id);
    }
  }, [expenseData]);

  const yearsArray = useMemo(() => {
    const years = getYearsData(expenseData);
    return years;
  }, [expenseData]);

  const monthsArray = useMemo(() => {
    const months = getMonthsData(expenseData, selectedYear);
    return months;
  }, [[selectedYear]]);

  useEffect(() => {
    setLoader(false);
    showLoader && props.navigation.navigate(EXPENSE_SCREENS.MONTH_EXPENSE);
  }, [monthExpense]);

  const handleOnMonthPress = (month: string) => {
    setLoader(true);
    dispatch(
      getMonthlyExpenseAction(accessToken, selectedYear, month, () => {
        setLoader(false);
      }),
    );
  };

  const renderMonths = ({item}) => {
    return (
      <MonthListItem
        totalSpent={item?.total}
        monthName={item?.monthName || ''}
        id={item?.id || ''}
        handleOnMonthPress={handleOnMonthPress}
      />
    );
  };

  const handleAddIcon = () => setShowModal(true);

  const handelShowModal = () => setShowModal(false);

  return (
    <>
      <Header navigation={props.navigation} headerTitle="Expenses" />
      <View style={[containerBackground, expenseStyles.mainContainer]}>
        <FlatList
          data={monthsArray}
          renderItem={renderMonths}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          onPress={handleAddIcon}
          style={expenseStyles?.plusHolder}>
          <Icon name="plus" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      {showLoader && (
        <View style={expenseStyles?.loader}>
          <Loader play={showLoader} />
        </View>
      )}
      <AddModal
        accessToken={accessToken}
        yearId={selectedYear}
        isVisible={showModal}
        handleVisibility={handelShowModal}
      />
    </>
  );
};

export default ExpensesIndex;
