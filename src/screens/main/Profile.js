import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {globalStyle} from '../../styles/globalStyles';
import {profileStyles} from '../../styles/profileStyles';
import {homeStyles} from '../../styles/homeStyles';
import {height, width} from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleValue} from '../../constants/Sizes';
import {globalColors} from '../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../../store/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {changePassword, getAllCountries} from '../../store/main/mainThunk';
import {editUserProfile, getMyProfile} from '../../store/auth/authThunk';
import {simDetailsStyle} from '../../styles/simDetailsStyle';
import AppModal from '../../components/AppModal';

const ProfileScreen = () => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);
  const [countries, setCountries] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [editedProfile, setEditedProfile] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    country: user?.countryId || '',
  });

  const editData = (key, text) => {
    setEditedProfile({...editedProfile, [key]: text});
  };
  const getCountries = async () => {
    try {
      const res = await dispatch(getAllCountries()).unwrap();
      setCountries(res.countries);
    } catch (err) {
      console.log(err);
    }
  };
  const getProfile = async () => {
    try {
      await dispatch(getMyProfile()).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(setToken(null));
  };
  const editProfile = async () => {
    try {
      const data = {
        ...editedProfile,
        countryID: editedProfile?.country?._id || '',
      };
      if (data.country) {
        delete data.country;
      }
      const response = await dispatch(editUserProfile(data)).unwrap();
      getProfile();
      Toast.show(response.message);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      Toast.show(err);
    }
  };
  const updatePassword = async () => {
    const data = {newPassword, oldPassword: currentPassword};

    try {
      const response = await dispatch(changePassword(data)).unwrap();
      Toast.show(response.message);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      Toast.show(err);
      setCurrentPassword('');
      setNewPassword('');
    }
  };
  return (
    <View style={[globalStyle.container]}>
      {/* Header section */}
      <View style={profileStyles.headerContainer}>
        <View style={homeStyles.headerFirstSection}>
          <Text style={homeStyles.headerText}>PROFILE</Text>
        </View>
      </View>
      <ScrollView
        style={profileStyles.container}
        contentContainerStyle={{
          paddingBottom: height * 0.13,
        }}>
        <View style={profileStyles.header}>
          <View style={profileStyles.avatar}>
            <Text style={profileStyles.avatarText}>
              {user?.email?.slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={profileStyles.activityCard}>
            <Text style={profileStyles.sectionTitle}>Activity Overview</Text>
            <Text style={profileStyles.infoText}>
              <Text style={profileStyles.infoTextHeading}>Total Esim:</Text> 0
            </Text>
            <Text style={profileStyles.infoText}>
              <Text style={profileStyles.infoTextHeading}>Total Packages:</Text>{' '}
              0
            </Text>
            <Text style={profileStyles.infoText}>
              <Text style={profileStyles.infoTextHeading}>Members Since:</Text>{' '}
              Mar 2025
            </Text>
          </View>
        </View>

        {/* Profile Information */}
        <View style={profileStyles.card}>
          <Text style={profileStyles.sectionTitle}>Profile Information</Text>

          {isEditing ? (
            <>
              <>
                <Text style={profileStyles.infoTextHeading}>Name:</Text>
                <TextInput
                  value={editedProfile.name}
                  onChangeText={text => editData('name', text)}
                  placeholderTextColor={globalColors.lightBlack}
                  style={profileStyles.input}
                  placeholder="Enter your name"
                />
              </>
              <>
                <Text style={profileStyles.infoTextHeading}>Email:</Text>
                <TextInput
                  value={editedProfile.email}
                  onChangeText={text => editData('email', text)}
                  placeholderTextColor={globalColors.lightBlack}
                  editable={false}
                  style={profileStyles.input}
                  placeholder="Enter your email"
                />
              </>
              <>
                <Text style={profileStyles.infoTextHeading}>Phone Number:</Text>
                <TextInput
                  value={editedProfile.phoneNumber}
                  onChangeText={text => editData('phoneNumber', text)}
                  placeholderTextColor={globalColors.lightBlack}
                  style={profileStyles.input}
                  keyboardType="numeric"
                  placeholder="Enter your phone number"
                />
              </>
              <>
                <Text style={profileStyles.infoTextHeading}>Address:</Text>
                <TextInput
                  value={editedProfile.address}
                  onChangeText={text => editData('address', text)}
                  placeholderTextColor={globalColors.lightBlack}
                  style={profileStyles.input}
                  placeholder="Enter your address"
                />
              </>
              <>
                <Text style={profileStyles.infoTextHeading}>Country:</Text>
                <TouchableOpacity
                  onPress={() => setIsCountryModalVisible(true)}
                  placeholderTextColor={globalColors.lightBlack}
                  style={profileStyles.input}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      color: editedProfile?.country
                        ? globalColors.black
                        : 'rgba(0,0,0,0.6)',
                    }}>
                    {editedProfile.country
                      ? editedProfile?.country?.countryName
                      : 'Select Country'}
                  </Text>
                </TouchableOpacity>
              </>
            </>
          ) : (
            <>
              <Text style={profileStyles.infoText}>
                <Text style={profileStyles.infoTextHeading}>Name:</Text>{' '}
                {user?.name || 'Not Provided'}
              </Text>
              <Text style={profileStyles.infoText}>
                <Text style={profileStyles.infoTextHeading}>Email:</Text>{' '}
                {user?.email}
              </Text>
              <Text style={profileStyles.infoText}>
                <Text style={profileStyles.infoTextHeading}>Phone Number:</Text>{' '}
                {user?.phoneNumber || 'Not Provided'}
              </Text>
              <Text style={profileStyles.infoText}>
                <Text style={profileStyles.infoTextHeading}>Address: </Text>
                {user?.address || 'Not Provided'}
              </Text>
              <Text style={profileStyles.infoText}>
                <Text style={profileStyles.infoTextHeading}>Country: </Text>
                {user?.countryId?.countryName || 'Not Provided'}
              </Text>
            </>
          )}

          {isEditing ? (
            <View style={profileStyles.saveBtnContainer}>
              <TouchableOpacity
                style={profileStyles.saveBtn}
                onPress={editProfile}>
                <Ionicons name="save-outline" size={16} color="#fff" />
                <Text style={profileStyles.saveBtnText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  profileStyles.saveBtn,
                  {backgroundColor: globalColors.grey},
                ]}
                onPress={() => {
                  // Reset edited values
                  setEditedProfile({
                    name: user?.name || '',
                    email: user?.email || '',
                    phone: '',
                    address: '',
                    country: '',
                  });
                  setIsEditing(false);
                }}>
                <Ionicons name="close" size={16} color="#000" />
                <Text
                  style={[
                    profileStyles.saveBtnText,
                    {color: globalColors.black},
                  ]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={profileStyles.editButton}
              onPress={() => setIsEditing(true)}>
              <Text style={profileStyles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Change Password */}
        <View style={profileStyles.card}>
          <Text style={profileStyles.sectionTitle}>Change Password</Text>

          <TextInput
            placeholder="Current Password"
            secureTextEntry
            value={currentPassword}
            placeholderTextColor={globalColors.lightBlack}
            onChangeText={setCurrentPassword}
            style={profileStyles.input}
          />
          <TextInput
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholderTextColor={globalColors.lightBlack}
            secureTextEntry
            style={profileStyles.input}
          />

          <TouchableOpacity
            style={profileStyles.updateButton}
            onPress={updatePassword}>
            <Text style={profileStyles.updateButtonText}>Update Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={profileStyles.logoutBtn}
          onPress={() => setIsLogout(true)}>
          <Ionicons
            name="log-out-outline"
            size={scaleValue(22)}
            color={globalColors.black}
          />
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: 16,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {isCountryModalVisible && (
        <View style={profileStyles.modalOverlay}>
          <TouchableWithoutFeedback
            onPress={() => setIsCountryModalVisible(false)}>
            <View style={profileStyles.modalBackground} />
          </TouchableWithoutFeedback>
          <View style={profileStyles.modalContainer}>
            <ScrollView>
              {countries.map((country, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    profileStyles.modalItem,
                    {
                      backgroundColor:
                        country._id === editedProfile.country._id
                          ? globalColors.backgroundColor
                          : globalColors.textColor,
                      borderColor:
                        country._id === editedProfile.country._id
                          ? globalColors.backgroundColor
                          : globalColors.black,
                    },
                  ]}
                  onPress={() => {
                    editData('country', country);
                    setIsCountryModalVisible(false);
                  }}>
                  <Text
                    style={[
                      profileStyles.modalItemText,
                      {
                        color:
                          country._id === editedProfile.country._id
                            ? globalColors.textColor
                            : globalColors.black,
                      },
                    ]}>
                    {country?.countryName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
      <AppModal
        visible={isLogout}
        title="Logout"
        description="Are you sure, you want to logout?"
        confirmText="YES"
        cancelText="NO"
        showCancel
        onClose={() => setIsLogout(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
};

export default ProfileScreen;
