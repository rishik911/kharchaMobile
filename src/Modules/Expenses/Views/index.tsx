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
import UpdateTextMpdal from '../../../Common/Components/UpdateTexModal';
import {updateProfileAction} from '../../Auth/Redux/AuthActions';

const ExpensesIndex: React.FC<ExpensesIndexTypes> = (props, {}) => {
  const dispatch = useDispatch();

  const {expenseData, monthExpense} = useSelector(state => state.expenseState);

  const {accessToken, profileData} = useSelector(state => state.authState);

  const [selectedYear, setSelectedYear] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [showUpdateGroup, setUpdateGroup] = useState(false);

  const [groupName, setGroupName] = useState('');

  const {containerBackground} = getCommonStyles();
  const [showLoader, setLoader] = useState(false);

  useEffect(() => {
    if (
      profileData?.groupName !== 'null' &&
      profileData?.groupName !== '' &&
      profileData?.groupName
    ) {
      dispatch(getExpenseDataAction(accessToken, profileData?.groupName));
    }
  }, []);

  useEffect(() => {
    if (expenseData?.length > 0 && !selectedYear) {
      setSelectedYear(expenseData?.[0]?.year);
    }
  }, [expenseData]);

  useEffect(() => {
    if (
      !profileData?.groupName ||
      profileData?.groupName === 'null' ||
      (profileData?.groupName === '' && !showUpdateGroup)
    ) {
      setUpdateGroup(true);
    }
  }, [profileData]);

  const handleGroupNameChange = e => {
    const {nativeEvent: text} = e || '';
    setGroupName(text);
  };

  const handleUpdateProfile = () => {
    dispatch(
      updateProfileAction(
        accessToken,
        {
          groupName: groupName?.text,
        },
        () => {
          setUpdateGroup(false);
          dispatch(getExpenseDataAction(accessToken, groupName?.text));
        },
      ),
    );
  };

  const hideModal = () => setUpdateGroup(false);

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
    showLoader &&
      props.navigation.navigate(EXPENSE_SCREENS.MONTH_EXPENSE, {
        yearId: selectedYear,
        accessToken: accessToken,
      });
  }, [monthExpense]);

  const handleOnMonthPress = (month: string) => {
    setLoader(true);
    dispatch(
      getMonthlyExpenseAction(
        accessToken,
        selectedYear,
        month,
        () => {
          setLoader(false);
        },
        profileData?.groupName,
      ),
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
        groupName={profileData?.groupName}
        yearId={selectedYear}
        isVisible={showModal}
        handleVisibility={handelShowModal}
      />
      <UpdateTextMpdal
        inputValue={groupName}
        label="Enter invite code ..."
        headerText="Enter your invite code"
        isVisible={showUpdateGroup}
        handleInputChange={handleGroupNameChange}
        handleVisibility={hideModal}
        handleButtonPress={handleUpdateProfile}
      />
    </>
  );
};

export default ExpensesIndex;
