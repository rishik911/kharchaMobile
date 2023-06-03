import {Dimensions, StyleSheet} from 'react-native';
import {THEME} from '../../../Common/Styles/Colors';

const {height, width} = Dimensions?.get('window');
export const profileStyles = StyleSheet.create({
  profileImageHolder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: width,
    width: width,
  },
  textContainer: {
    marginHorizontal: 24,
  },
  buttonholder: {
    width: '50%',
    alignSelf: 'center',
    marginVertical: 12,
    alignItems: 'center',
  },
  textLine: {
    backgroundColor: THEME.BG,
    marginVertical: 12,
    borderRadius: 12,
    padding: 12,
  },
  buttonText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
