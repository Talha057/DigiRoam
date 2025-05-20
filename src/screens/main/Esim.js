import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
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
import {
  changePassword,
  getAllCountries,
  getUserEsims,
} from '../../store/main/mainThunk';
import {editUserProfile, getMyProfile} from '../../store/auth/authThunk';
import {simDetailsStyle} from '../../styles/simDetailsStyle';
import AppModal from '../../components/AppModal';
import {cartStyles} from '../../styles/cartStyles';
import {esimsStyles} from '../../styles/esimStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

const MyEsims = ({navigation}) => {
  const {loading, userEsims} = useSelector(state => state.main);
  const dispatch = useDispatch();

  const getMyEsims = async () => {
    try {
      await dispatch(getUserEsims()).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyEsims();
  }, []);
  const renderEsimCard = ({item}) => (
    <TouchableOpacity
      style={esimsStyles.card}
      onPress={() => navigation.navigate('EsimDetails', {esimData: item})}>
      <View style={esimsStyles.cardLeft}>
        <Ionicons
          name="cellular-outline"
          size={30}
          color={globalColors.backgroundColor}
        />
      </View>
      <View style={esimsStyles.cardRight}>
        <Text style={esimsStyles.simName}>
          {item?.packageList[0].packageName || 'eSIM Plan'}
        </Text>
        <Text style={esimsStyles.simDetails}>
          {/* {item.country || 'Country Unknown'} - {item.dataAmount || '0GB'} */}
          Expiry:{' '}
          {item?.expiredTime &&
            new Date(item?.expiredTime).toLocaleDateString()}
        </Text>
        <Text style={esimsStyles.simStatus}>Status: {item.esimStatus}</Text>
      </View>
    </TouchableOpacity>
  );
  console.log(userEsims);
  return (
    <SafeAreaView
      style={[globalStyle.container, {backgroundColor: globalColors.textColor}]}
      edges={['top']}>
      {/* Header section */}
      <View style={profileStyles.headerContainer}>
        <View style={homeStyles.headerFirstSection}>
          <Text style={homeStyles.headerText}>MY eSIMS</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: globalColors.lightgrey,
          justifyContent: 'center',
        }}>
        {loading ? (
          <ActivityIndicator size={20} color={globalColors.backgroundColor} />
        ) : (
          <>
            {userEsims?.length > 0 ? (
              // <View />
              <FlatList
                data={userEsims}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderEsimCard}
                contentContainerStyle={esimsStyles.listContent}
              />
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: width * 0.02,
                }}>
                <Text style={cartStyles.emptyCartText}>
                  No eSIMs found. Please try purchasing any!.
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyEsims;
