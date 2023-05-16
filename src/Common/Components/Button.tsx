import React, {useMemo} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import getCommonStyles from '../Styles';

interface ButtonProps {
  title: string;
  onButtonPress: any;
  buttonType?: 'cta' | 'primary' | 'secondary' | 'text';
  isDisabled?: boolean;
}

const CommonButton: React.FC<ButtonProps> = ({
  title,
  onButtonPress,
  buttonType = 'cta',
  isDisabled = false,
}) => {
  const {ctaButtonStyles, ctaText, textButtonText} = getCommonStyles();

  const getStyle = useMemo(() => {
    if (buttonType === 'cta') return ctaButtonStyles;
  }, [buttonType]);

  const getTextStyle = useMemo(() => {
    if (buttonType === 'cta') return ctaText;
    if (buttonType === 'text') return textButtonText;
  }, [buttonType]);

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[getStyle]}
      onPress={onButtonPress}>
      <Text style={[getTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default CommonButton;
