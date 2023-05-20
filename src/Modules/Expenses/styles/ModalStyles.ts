import {StyleSheet} from 'react-native';

export const modalStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '90%',
    marginVertical: '40%',
    borderRadius : 12
  },
  text1: {
    fontSize: 22,
    fontWeight: '500',
  },
  dropDown1: {
    margin: 12,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.8,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  btnContainer: {
    width: '55%',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text2: {
    fontSize: 18,
    fontWeight: '500',
  },
  dropdown2: {
    margin: 12,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.8,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
