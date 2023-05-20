import React, {useState, useMemo} from 'react';
import {AddModalTypes} from '../../../types';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import getCommonStyles from '../../../../Common/Styles';
import {Dropdown} from 'react-native-element-dropdown';
import {
  DROP_DOWN_SELECT,
  MONTH_DROP_DOWN,
  YEAR_DROP_DOWN,
} from '../../Utils/constants';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import CommonButton from '../../../../Common/Components/Button';
import {modalStyles} from '../../styles/ModalStyles';
import {useDispatch} from 'react-redux';
import Loader from '../../../../Common/Components/Loader';
import {expenseStyles} from '../../styles/ExpenseStyles';
import {
  postNewMonthAction,
  postNewYearAction,
} from '../../Redux/ExpenseActions';

const AddModal: React.FC<AddModalTypes> = ({
  isVisible,
  handleVisibility,
  accessToken,
  yearId,
}) => {
  const {containerBackground, textColor} = getCommonStyles();

  const [selectedMode, setSelectedMode] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [showLoader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const handleChange = data => setSelectedMode(data?.value);

  const handleYearChange = data => setYear(data?.value);

  const handleMonthChange = data => setMonth(data?.value);

  const initialDropDown = useMemo(() => {
    if (!yearId) return [DROP_DOWN_SELECT[0]];
    else return DROP_DOWN_SELECT;
  }, [yearId]);

  const getSelectedView = () => {
    if (selectedMode === 'new_year') {
      return (
        <View>
          <Text style={[textColor, modalStyles?.text2]}>
            Select year from the dropdown
          </Text>
          <Dropdown
            selectedTextStyle={textColor}
            style={modalStyles?.dropdown2}
            labelField="label"
            valueField="value"
            data={YEAR_DROP_DOWN}
            value={selectedMode}
            onChange={handleYearChange}
          />
        </View>
      );
    }
    if (selectedMode === 'new_month') {
      return (
        <View>
          <Text style={[textColor, modalStyles?.text2]}>
            Select month from the dropdown
          </Text>
          <Dropdown
            selectedTextStyle={textColor}
            style={modalStyles?.dropdown2}
            labelField="label"
            valueField="value"
            data={MONTH_DROP_DOWN}
            value={selectedMode}
            onChange={handleMonthChange}
          />
        </View>
      );
    }
  };

  const isButtonDisabled = useMemo(() => {
    if (!selectedMode) return true;
    if (selectedMode) {
      if (selectedMode === 'new_year') return !year;
      if (selectedMode === 'new_month') return !month;
    } else return false;
  }, [selectedMode, year, month]);

  const submitForm = () => {
    setLoader(true);
    if (selectedMode === 'new_year') {
      dispatch(
        postNewYearAction(accessToken, year, value => {
          value === true && handleVisibility();
          setLoader(false);
        }),
      );
    }
    if (selectedMode === 'new_month') {
      dispatch(
        postNewMonthAction(accessToken, yearId, month, value => {
          value === true && handleVisibility();
          setLoader(false);
        }),
      );
    }
  };

  return (
    <Modal
      style={[containerBackground, modalStyles?.container]}
      isVisible={isVisible}
      onDismiss={handleVisibility}>
      <View style={{margin: 12}}>
        <Text style={[textColor, modalStyles?.text1]}>
          What would you like to add ?
        </Text>
        <Dropdown
          selectedTextStyle={textColor}
          style={modalStyles?.dropDown1}
          labelField="label"
          valueField="value"
          data={initialDropDown}
          value={selectedMode}
          onChange={handleChange}
        />
      </View>
      {getSelectedView()}
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
      {showLoader && (
        <View style={expenseStyles?.loader}>
          <Loader play={showLoader} />
        </View>
      )}
    </Modal>
  );
};

export default AddModal;
