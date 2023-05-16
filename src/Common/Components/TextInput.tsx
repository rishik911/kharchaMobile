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
}

const CommonTextInput: React.FC<TextInputProps> = ({
  inputValue,
  placeholder,
  onChangeText,
  keyboard = 'default',
  error = false,
  secured = false,
  errorText = '',
}) => {
  const {borderColor} = getCommonStyles();
  return (
    <View style={styles.container}>
      <TextInput
        style={[borderColor, styles.input, error && styles.error]}
        value={inputValue}
        onChange={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secured}
        keyboardType={keyboard}
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
    padding : 4
  },
});

export default CommonTextInput;
