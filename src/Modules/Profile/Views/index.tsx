import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {ProfileIndexTypes} from '../../types';
import CommonButton from '../../../Common/Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  initiateLogoutAction,
  updateProfileAction,
} from '../../Auth/Redux/AuthActions';
import Header from '../../../Common/Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {profileStyles} from './styles';
import getCommonStyles from '../../../Common/Styles';
import UpdateTextMpdal from '../../../Common/Components/UpdateTexModal';

const ProfileIndex: React.FC<ProfileIndexTypes> = (props, {}) => {
  const dispatch = useDispatch();
  const {profileData, accessToken} = useSelector(state => state.authState);

  const {textColor} = getCommonStyles();

  const [showUpdateModal, setUpdateModal] = useState(false);

  const [currentEditable, setEditable] = useState('');

  const [inputValue, setInputValue] = useState('');

  const handleChangeValue = (id: string) => {
    if (id === 'firstName') {
      setEditable(id);
      setUpdateModal(true);
      setInputValue(profileData?.firstName);
    }

    if (id === 'lastName') {
      setEditable(id);
      setUpdateModal(true);
      setInputValue(profileData?.lastName);
    }
  };

  const handleTextChange = (e: any) => {
    const {nativeEvent: text} = e || '';
    setInputValue(text);
  };

  const updatProfie = () => {
    const payload = {};
    if (currentEditable === 'firstName') {
      payload.firstName = inputValue.text;
    }
    console.log(payload);
    dispatch(
      updateProfileAction(accessToken, payload, () => {
        setEditable('');
        setInputValue('');
        setUpdateModal(false);
      }),
    );
  };

  const EditProfileData = (
    text: string,
    label: string,
    id: string,
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
              <TouchableOpacity onPress={() => handleChangeValue(id)}>
                <Icon name="edit" color="#000" size={18} />
              </TouchableOpacity>
            )}
          </View>
        }
      </View>
    );
  };

  const hideUdpateModal = () => setUpdateModal(false);
  const getLabel = useMemo(() => {
    switch (currentEditable) {
      case 'firstName':
        return 'Update your firstname...';
      case 'lastName':
        return 'Update your lastname...';
      default:
        return '';
    }
  }, [currentEditable]);

  return (
    <>
      <Header navigation={props.navigation} headerTitle="Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={profileStyles?.profileImageHolder}>
          <Icon name="user" size={120} />
        </View>
        <View style={profileStyles.textContainer}>
          {EditProfileData(
            `${profileData?.firstName}`,
            'First name',
            'firstName',
            true,
          )}

          {EditProfileData(
            `${profileData?.lastName}`,
            'Last name',
            'lastName',
            true,
          )}
          {EditProfileData(profileData?.email, 'Your email', 'email')}
        </View>
        <View style={profileStyles.buttonholder}>
          <CommonButton
            title="Log out"
            buttonType="cta"
            onButtonPress={() => dispatch(initiateLogoutAction())}
          />
        </View>
        <UpdateTextMpdal
          inputValue={inputValue}
          handleInputChange={handleTextChange}
          label={getLabel}
          headerText="Update your profile here"
          isVisible={showUpdateModal}
          handleVisibility={hideUdpateModal}
          enableClose
          handleButtonPress={updatProfie}
        />
      </ScrollView>
    </>
  );
};

export default ProfileIndex;
