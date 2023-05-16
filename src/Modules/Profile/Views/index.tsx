import React from 'react';
import {View, Text} from 'react-native';
import {ProfileIndexTypes} from '../../types';
import CommonButton from '../../../Common/Components/Button';
import {useDispatch} from 'react-redux';
import {initiateLogoutAction} from '../../Auth/Redux/AuthActions';

const ProfileIndex: React.FC<ProfileIndexTypes> = ({}) => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Profile</Text>
      <CommonButton
        title="Log out"
        onButtonPress={() => dispatch(initiateLogoutAction())}
      />
    </View>
  );
};

export default ProfileIndex;
