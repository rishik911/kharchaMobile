import {useColorScheme, StyleSheet} from 'react-native';
import {DARK_COLORS, LIGHT_COLORS} from './Colors';

const getCommonStyles = () => {
  const LightMode = StyleSheet.create({
    containerBackground: {
      backgroundColor: LIGHT_COLORS.background,
    },
    textColor: {
      color: LIGHT_COLORS.text,
    },
    borderColor: {
      borderWidth: 1,
      borderColor: LIGHT_COLORS.border,
      borderRadius: 8,
      shadowOpacity: 1,
      shadowRadius: 12,
      shadowColor: LIGHT_COLORS.border,
    },
    ctaButtonStyles: {
      backgroundColor: LIGHT_COLORS.ctaButton,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
    },
    ctaText: {
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '500',
      color: LIGHT_COLORS.background,
    },
    textButtonText: {
      color: LIGHT_COLORS.textButtonText,
      paddingHorizontal: 4,
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '500',
    },
    haedingText: {
      color: LIGHT_COLORS.text,
      paddingHorizontal: 4,
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '500',
    },
    headerView: {
      height: 70,
      borderBottomWidth: 0.5,
      borderBottomColor: LIGHT_COLORS.background,
      shadowColor: LIGHT_COLORS.border,
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 24,
      alignItems: 'center',
      paddingHorizontal: 16,
      flexDirection: 'row',
    },
    listItemCard: {
      backgroundColor: LIGHT_COLORS.listItemBg,
    },
    listCardText: {
      color: LIGHT_COLORS.listItemTextColor,
      fontWeight: '600',
    },
    erroButtonStyles: {
      backgroundColor: DARK_COLORS.errorButton,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
    },
  });

  const DarkMode = StyleSheet.create({
    containerBackground: {
      backgroundColor: DARK_COLORS.background,
    },
    textColor: {
      color: DARK_COLORS.text,
    },
    borderColor: {
      borderWidth: 1,
      borderColor: DARK_COLORS.border,
      borderRadius: 8,
    },
    ctaButtonStyles: {
      backgroundColor: DARK_COLORS.ctaButton,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
    },
    erroButtonStyles: {
      backgroundColor: DARK_COLORS.errorButton,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
    },
    ctaText: {
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '500',
    },
    textButtonText: {
      color: LIGHT_COLORS.textButtonText,
      paddingHorizontal: 4,
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '500',
    },
    haedingText: {
      color: DARK_COLORS.text,
      paddingHorizontal: 4,
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '500',
    },
    headerView: {
      height: 70,
      borderBottomWidth: 1,
      borderBottomColor: LIGHT_COLORS.border,
    },
    listItemCard: {
      backgroundColor: LIGHT_COLORS.listItemBg,
    },
    listCardText: {
      color: LIGHT_COLORS.listItemTextColor,
      fontWeight: '600',
    },
  });

  const theme = useColorScheme();

  const isDarkMode = theme === 'dark';

  return isDarkMode ? DarkMode : LightMode;
};

export default getCommonStyles;
