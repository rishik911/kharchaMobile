import React, {useMemo, useState} from 'react';
import {LoginTypes} from '../../types';
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
import {useDispatch} from 'react-redux';
import {initiateLoginAction} from '../Redux/AuthActions';
import Loader from '../../../Common/Components/Loader';

const Login: React.FC<LoginTypes> = (props, {}) => {
  const {containerBackground, haedingText} = getCommonStyles();

  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleEmailChange = (e: any) => {
    if (emailError) setEmailError(false);
    const {nativeEvent: text} = e || '';
    setEmail(text);
  };

  const handleLoginPress = () => {
    if (!EMAIL_REGEX.test(email?.text)) setEmailError(true);
    if (!PASSWORD_REGEX.test(password?.text)) setPasswordError(true);
    else {
      setLoading(true);
      dispatch(
        initiateLoginAction(email?.text, password?.text, function (state) {
          setLoading(false);
        }),
      );
    }
  };

  const handlePasswordChange = (e: any) => {
    if (passwordError) setPasswordError(false);
    const {nativeEvent: text} = e || '';
    setPassword(text);
  };

  const handleSignUpPress = () => {
    navigation.navigate(AUTH_SCREENS.SIGN_UP);
  };

  const isButonDisabled = useMemo(() => {
    if (emailError) return true;
    if (passwordError) return true;
  }, [emailError, passwordError]);

  return (
    <View style={[containerBackground, SignUpStyles.container]}>
      <Text style={[haedingText, SignUpStyles.topText]}>
        {STRINGS.LOGIN_ACCOUNT}
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
          title="Log in"
          onButtonPress={handleLoginPress}
          isDisabled={isButonDisabled}
        />
      </View>
      <View style={SignUpStyles.loginContainer}>
        <Text style={SignUpStyles.alreadyText}>{STRINGS.SIGN_UP}</Text>
        <CommonButton
          buttonType="text"
          title="Sign Up"
          onButtonPress={handleSignUpPress}
        />
      </View>
      {loading && <Loader play={loading} />}
    </View>
  );
};

export default Login;
