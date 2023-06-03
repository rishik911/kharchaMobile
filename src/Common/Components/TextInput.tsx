import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  Text,
} from 'react-native';
import getCommonStyles from '../Styles';

interface TextInputProps {
  placeholder: string;
  inputValue: string;
  onChangeText: any;
  keyboard?: KeyboardTypeOptions;
  error?: boolean;
  secured?: boolean;
  errorText?: string;
  container?: any;
  inputStyle?: any;
  isEditable?: boolean;
}

const CommonTextInput: React.FC<TextInputProps> = ({
  inputValue,
  placeholder,
  onChangeText,
  keyboard = 'default',
  error = false,
  secured = false,
  errorText = '',
  container = null,
  inputStyle = null,
  isEditable = true,
}) => {
  const {borderColor} = getCommonStyles();
  return (
    <View style={container ? container : styles.container}>
      <TextInput
        style={[
          borderColor,
          inputStyle ? inputStyle : styles.input,
          error && styles.error,
        ]}
        value={inputValue}
        onChange={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secured}
        keyboardType={keyboard}
        editable={isEditable}
      />
      {error && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '60%',
  },
  input: {
    padding: 12,
  },
  error: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    padding: 4,
  },
});

export default CommonTextInput;
