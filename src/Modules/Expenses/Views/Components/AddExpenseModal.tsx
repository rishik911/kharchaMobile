import React, {useMemo, useState} from 'react';
import {AddExpenseModalTypes} from '../../../types';
import Modal from 'react-native-modal';
import getCommonStyles from '../../../../Common/Styles';
import {modalStyles} from '../../styles/ModalStyles';
import {View, Text} from 'react-native';
import CommonButton from '../../../../Common/Components/Button';
import CommonTextInput from '../../../../Common/Components/TextInput';
import {useDispatch, useSelector} from 'react-redux';
import {addNewExpenseAction} from '../../Redux/ExpenseActions';
import {expenseStyles} from '../../styles/ExpenseStyles';
import Loader from '../../../../Common/Components/Loader';

const AddExpenseModal: React.FC<AddExpenseModalTypes> = ({
  isVisible,
  handleVisibility,
  accessToken,
  yearId,
  monthName,
  groupName,
}) => {
  const {containerBackground, textColor} = getCommonStyles();
  const [expenseType, setExpenseType] = useState('');
  const [amount, setAmount] = useState('');
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const {profileData} = useSelector(state => state.authState);

  const handleExpenseChange = (e: any) => {
    const {nativeEvent: text} = e || '';
    setExpenseType(text?.text);
  };

  const handleAmountChange = (e: any) => {
    const {nativeEvent: text} = e || '';
    setAmount(text?.text);
  };

  const isButtonDisabled = useMemo(
    () => amount === '' || expenseType === '',
    [amount, expenseType],
  );

  console.log(profileData);

  const submitForm = () => {
    const expense = {
      expenseType: expenseType,
      amount: parseFloat(amount),
      spendBy: profileData?.firstName,
      spendOn: new Date(),
    };
    if (yearId && monthName) {
      setLoader(true);
      dispatch(
        addNewExpenseAction(
          accessToken,
          yearId,
          monthName,
          expense,
          state => {
            setLoader(false), state && handleVisibility();
          },
          groupName,
        ),
      );
    }
  };

  return (
    <Modal
      style={[containerBackground, modalStyles?.container]}
      isVisible={isVisible}
      statusBarTranslucent={true}
      onDismiss={handleVisibility}>
      <View style={{margin: 12}}>
        <Text style={[textColor, modalStyles?.text1, {marginVertical: 8}]}>
          Where did you spend ?
        </Text>
        <CommonTextInput
          placeholder="Expense type"
          inputValue={expenseType}
          onChangeText={handleExpenseChange}
          container={{
            marginVertical: 12,
          }}
          inputStyle={{
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
          keyboard="default"
        />
        <CommonTextInput
          placeholder="Amount spent"
          inputValue={amount}
          onChangeText={handleAmountChange}
          container={{
            marginVertical: 12,
          }}
          inputStyle={{
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
          keyboard="number-pad"
        />
      </View>

      <View style={modalStyles?.btnContainer}>
        <CommonButton
          isDisabled={isButtonDisabled}
          title="Submit"
          onButtonPress={submitForm}
        />
        <CommonButton
          buttonType="close"
          title="Close"
          onButtonPress={handleVisibility}
        />
      </View>
      {loader && (
        <View style={expenseStyles?.loader}>
          <Loader play={loader} />
        </View>
      )}
    </Modal>
  );
};

export default AddExpenseModal;
