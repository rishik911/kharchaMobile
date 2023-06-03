import {StyleSheet} from 'react-native';
import {THEME} from '../../../Common/Styles/Colors';

export const expenseStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  monthCard: {
    height: 'auto',
    margin: 12,
    padding: 24,
    borderRadius: 12,
    shadowColor: THEME.BG,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 12,
    backgroundColor: THEME.BG,
  },
  monthName: {
    fontSize: 24,
  },
  total: {
    fontSize: 20,
    paddingLeft: 4,
  },
  rowRender: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    top: '30%',
    left: '30%',
  },
  plusHolder: {
    backgroundColor: '#dfe3eb',
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    top: '90%',
    left: '85%',
    shadowColor: '#dfe3eb',
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 12,
  },
  headerContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: THEME.BG,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalLine: {
    width: '100%',
    backgroundColor: 'grey',
    height: 0.5,
    marginVertical: 12,
  },
  gap: {
    marginBottom: 8,
  },
});
