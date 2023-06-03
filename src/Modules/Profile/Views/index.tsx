import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {ProfileIndexTypes} from '../../types';
import CommonButton from '../../../Common/Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {initiateLogoutAction} from '../../Auth/Redux/AuthActions';
import Header from '../../../Common/Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {profileStyles} from './styles';
import CommonTextInput from '../../../Common/Components/TextInput';
import getCommonStyles from '../../../Common/Styles';

const ProfileIndex: React.FC<ProfileIndexTypes> = (props, {}) => {
  const dispatch = useDispatch();
  const {profileData} = useSelector(state => state.authState);

  const {textColor} = getCommonStyles();

  const EditProfileData = (
    text: string,
    label: string,
    showEdit: boolean = false,
  ) => {
    return (
      <View style={profileStyles.textLine}>
        <Text style={[textColor, {fontWeight: '400', fontSize: 12}]}>
          {label}
        </Text>
        {
          <View style={profileStyles?.buttonText}>
            <Text style={[textColor, {fontWeight: '800', fontSize: 18}]}>
              {text}
            </Text>
            {showEdit && (
              <TouchableOpacity onPress={() => {}}>
                <Icon name="edit" color="#000" size={18} />
              </TouchableOpacity>
            )}
          </View>
        }
      </View>
    );
  };

  return (
    <>
      <Header navigation={props.navigation} headerTitle="Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={profileStyles?.profileImageHolder}>
          <Icon name="user" size={120} />
        </View>
        <View style={profileStyles.textContainer}>
          {EditProfileData(
            `${profileData?.firstName} ${profileData?.lastName}`,
            'Your name',
          )}

          {EditProfileData(profileData?.email, 'Your email')}
        </View>
        <View style={profileStyles.buttonholder}>
          <CommonButton
            title="Log out"
            buttonType="cta"
            onButtonPress={() => dispatch(initiateLogoutAction())}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileIndex;
