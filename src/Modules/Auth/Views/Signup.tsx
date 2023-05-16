import React, {useMemo, useState} from 'react';
import {SignUpTypes} from '../../types';
import {View, Text} from 'react-native';
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

  const handleSignUpPress = () => {
    if (!EMAIL_REGEX.test(email?.text)) setEmailError(true);
    if (!PASSWORD_REGEX.test(password?.text)) setPasswordError(true);
    else {
      setLoading(true);
      dispatch(
        initiateSignUpAction(email?.text, password?.text, function (state) {
          setLoading(false);
        }),
      );
    }
  };

  const isButonDisabled = useMemo(() => {
    if (emailError) return true;
    if (passwordError) return true;
  }, [emailError, passwordError]);
  return (
    <View style={[containerBackground, SignUpStyles.container]}>
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
    </View>
  );
};

export default Signup;
