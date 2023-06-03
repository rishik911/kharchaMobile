import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import getCommonStyles from '../Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

interface HeaderProps {
  headerTitle?: string;
  showBack?: boolean;
  navigation: any;
}

const Header: React.FC<HeaderProps> = ({
  headerTitle = '',
  showBack = false,
  navigation,
}) => {
  const {containerBackground, headerView, textColor, haedingText} =
    getCommonStyles();

  const handleOnpress = () => {
    if (showBack) {
      navigation?.goBack();
    } else {
      navigation?.openDrawer();
    }
  };

  return (
    <View style={[headerView, containerBackground]}>
      <TouchableOpacity onPress={handleOnpress}>
        {showBack ? (
          <Icon name="chevron-left" size={22} {...textColor} />
        ) : (
          <Icon name="bars" size={25} {...textColor} />
        )}
      </TouchableOpacity>
      <Text style={[haedingText, styles.headerText]}>{headerTitle}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerText: {
    marginLeft: 8,
    marginBottom: 2,
  },
});
