import * as React from 'react';
import {Text, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {THEME} from '../../Common/Styles/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileDataAction} from '../../Modules/Auth/Redux/AuthActions';
import getCommonStyles from '../../Common/Styles';

function CustomDrawerContent(props) {
  const {accessToken, profileData} = useSelector(state => state.authState);

  const dispatch = useDispatch();

  const {textColor} = getCommonStyles();

  React.useEffect(() => {
    if (accessToken) {
      dispatch(getProfileDataAction(accessToken));
    }
  }, []);
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={{backgroundColor: THEME.BG}}>
          <View
            style={{
              alignSelf: 'center',
              height: 150,
              width: 150,
              borderRadius: 75,
              borderWidth: 1,
              borderColor: THEME.BG,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 12,
            }}>
            <Icon name="user" size={120} />
          </View>
          <View style={{alignItems: 'center', marginBottom: 12}}>
            <Text style={[textColor, {fontWeight: '700', fontSize: 16}]}>
              {profileData?.firstName} {profileData?.lastName}
            </Text>
          </View>
        </View>

        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
