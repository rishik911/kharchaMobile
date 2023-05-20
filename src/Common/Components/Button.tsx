import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import getCommonStyles from '../Styles';

interface ButtonProps {
  title: string;
  onButtonPress: any;
  buttonType?: 'cta' | 'primary' | 'secondary' | 'text' | 'close';
  isDisabled?: boolean;
  showLoader?: boolean;
}

const CommonButton: React.FC<ButtonProps> = ({
  title,
  onButtonPress,
  buttonType = 'cta',
  isDisabled = false,
  showLoader = false,
}) => {
  const {ctaButtonStyles, erroButtonStyles, ctaText, textButtonText} =
    getCommonStyles();

  const getStyle = useMemo(() => {
    if (buttonType === 'cta') return ctaButtonStyles;
    if (buttonType === 'close') return erroButtonStyles;
  }, [buttonType]);

  const getTextStyle = useMemo(() => {
    if (buttonType === 'cta') return ctaText;
    if (buttonType === 'close') return ctaText;
    if (buttonType === 'text') return textButtonText;
  }, [buttonType]);

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[getStyle]}
      onPress={onButtonPress}>
      {showLoader ? (
        <ActivityIndicator />
      ) : (
        <Text style={[getTextStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default CommonButton;
