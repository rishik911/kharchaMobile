import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import CommonTextInput from './TextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import getCommonStyles from '../Styles';
import CommonButton from './Button';

interface UpdateTextModalProps {
  isVisible: boolean;
  handleVisibility: () => void;
  headerText: string;
  inputValue: string;
  handleInputChange: (data: any) => void;
  label: string;
  handleButtonPress: () => void;
  enableClose?: boolean;
}

const UpdateTextMpdal: React.FC<UpdateTextModalProps> = ({
  isVisible,
  handleVisibility,
  headerText,
  inputValue,
  handleInputChange,
  label,
  handleButtonPress,
  enableClose = false,
}) => {
  const {containerBackground, textColor} = getCommonStyles();
  return (
    <Modal
      style={[containerBackground, styles.contaier]}
      isVisible={isVisible}
      statusBarTranslucent={true}
      onDismiss={handleVisibility}>
      <View>
        {enableClose && (
          <TouchableOpacity
            onPress={handleVisibility}
            style={{alignSelf: 'flex-end'}}>
            <Icon name="close" size={14} />
          </TouchableOpacity>
        )}
        <Text style={[textColor, styles.text]}>{headerText}</Text>

        <CommonTextInput
          inputValue={inputValue}
          placeholder={label}
          onChangeText={handleInputChange}
          container={styles.inputContainer}
          keyboard="default"
        />
      </View>
      <View style={styles.btnContainer}>
        <CommonButton onButtonPress={handleButtonPress} title="Update" />
      </View>
    </Modal>
  );
};

export default UpdateTextMpdal;

const styles = StyleSheet.create({
  contaier: {
    alignSelf: 'center',
    width: '70%',
    marginVertical: '60%',
    borderRadius: 12,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 12,
  },
  btnContainer: {
    alignSelf: 'center',
  },
});
