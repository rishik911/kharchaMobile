import React, {useMemo, useState} from 'react';
import {SignUpTypes} from '../../types';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import getCommonStyles from '../../../Common/Styles';
import {SignUpStyles} from '../Styles.ts/SignUpStyles';
import CommonTextInput from '../../../Common/Components/TextInput';
import CommonButton from '../../../Common/Components/Button';
import {
  AUTH_SCREENS,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '../../../Utils/Constants';
import {STRINGS} from '../../../Utils/Strings';
import {initiateSignUpAction} from '../Redux/AuthActions';
import {useDispatch} from 'react-redux';
import Loader from '../../../Common/Components/Loader';

const Signup: React.FC<SignUpTypes> = (props, {}) => {
  const {containerBackground, haedingText} = getCommonStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [fNameError, setFnameError] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lNameError, setLNameError] = useState(false);

  const {navigation} = props;

  const dispatch = useDispatch();

  const handleEmailChange = (e: any) => {
    if (emailError) setEmailError(false);
    const {nativeEvent: text} = e || '';
    setEmail(text);
  };

  const handleLoginPress = () => {
    navigation.navigate(AUTH_SCREENS.LOGIN);
  };

  const handlePasswordChange = (e: any) => {
    if (passwordError) setPasswordError(false);
    const {nativeEvent: text} = e || '';
    setPassword(text);
  };

  const handleFirstNameChange = (e: any) => {
    if (fNameError) setFnameError(false);
    const {nativeEvent: text} = e || '';
    setFirstName(text);
  };

  const handleLastNameChange = (e: any) => {
    if (lNameError) setLNameError(false);
    const {nativeEvent: text} = e || '';
    setLastName(text);
  };

  const handleSignUpPress = () => {
    if (!EMAIL_REGEX.test(email?.text)) setEmailError(true);
    if (!PASSWORD_REGEX.test(password?.text)) setPasswordError(true);
    if (firstName === '' || !firstName) setFnameError(true);
    if (lastName === '' || !firstName) setLNameError(true);
    else {
      setLoading(true);
      dispatch(
        initiateSignUpAction(
          email?.text,
          password?.text,
          firstName?.text,
          lastName?.text,
          function (state) {
            setLoading(false);
          },
        ),
      );
    }
  };

  const isButonDisabled = useMemo(() => {
    if (emailError) return true;
    if (passwordError) return true;
  }, [emailError, passwordError]);
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={[containerBackground, SignUpStyles.container]}>
      <Text style={[haedingText, SignUpStyles.topText]}>
        {STRINGS.CREATE_ACCOUNT}
      </Text>
      <CommonTextInput
        placeholder="Enter your email"
        onChangeText={handleEmailChange}
        inputValue={email}
        error={emailError}
        errorText={STRINGS.EMAIL_FORMAT_ERROR}
      />
      <CommonTextInput
        inputValue={password}
        placeholder="Enter your password.."
        onChangeText={handlePasswordChange}
        error={passwordError}
        secured={true}
        errorText={STRINGS.PASSWORD_FORMAT_ERROR}
      />
      <CommonTextInput
        inputValue={firstName}
        placeholder="Enter your first name.."
        onChangeText={handleFirstNameChange}
        error={fNameError}
        secured={false}
        errorText={STRINGS.NAME_ERROR}
      />
      <CommonTextInput
        inputValue={lastName}
        placeholder="Enter your last name.."
        onChangeText={handleLastNameChange}
        error={lNameError}
        secured={false}
        errorText={STRINGS.PASSWORD_FORMAT_ERROR}
      />

      <View style={SignUpStyles.buttonContainer}>
        <CommonButton
          title="Sign Up"
          onButtonPress={handleSignUpPress}
          isDisabled={isButonDisabled}
        />
      </View>
      <View style={SignUpStyles.loginContainer}>
        <Text style={SignUpStyles.alreadyText}>{STRINGS.LOGIN}</Text>
        <CommonButton
          buttonType="text"
          title="Log in"
          onButtonPress={handleLoginPress}
        />
      </View>
      {loading && <Loader play={loading} />}
    </KeyboardAvoidingView>
  );
};

export default Signup;
