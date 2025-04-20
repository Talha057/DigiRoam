import {
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {globalColors} from '../../constants/Colors';
import {height, width} from '../../utils';
import {scaleValue, scaleXValue, scaleYValue} from '../../constants/Sizes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect, useState} from 'react';
import {
  africaMap,
  banner,
  pakMap,
  usMap,
  dubaiMap,
  ukMap,
  usFlag,
  pakFlag,
  africaFlag,
  dubaiFlag,
  ukFlag,
} from '../../assets/images';
import {globalStyle} from '../../styles/globalStyles';
import {homeStyles} from '../../styles/homeStyles';
import SimCard from '../../components/SimCard';
import {
  getCartDetails,
  getEsims,
  verifyUserToken,
} from '../../store/main/mainThunk';
import {useDispatch, useSelector} from 'react-redux';
import {getMyProfile} from '../../store/auth/authThunk';
import AppModal from '../../components/AppModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../../store/auth/authSlice';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('local');
  const [globalEsims, setGlobalEsims] = useState([]);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const {cart} = useSelector(state => state.main);
  const {token} = useSelector(state => state.auth);
  const regionalData = [
    {title: 'Africa', image: africaMap, countryCode: '!RG'},
    {title: 'United States', image: usMap, countryCode: '!RG'},
    {title: 'Pakistan', image: pakMap, countryCode: '!RG'},
    {title: 'Dubai', image: dubaiMap, countryCode: '!RG'},
    {title: 'United Kingdom', image: ukMap, countryCode: '!RG'},
  ];
  const localData = [
    {title: 'Pakistan', image: pakFlag, countryCode: 'PK'},
    {title: 'United States', image: usFlag, countryCode: 'US'},
    {title: 'South Africa', image: africaFlag, countryCode: 'ZA'},
    {title: 'Dubai', image: dubaiFlag, countryCode: 'AE'},
    {title: 'United Kingdom', image: ukFlag, countryCode: 'GB'},
  ];
  const getTabStyle = tabName => ({
    backgroundColor:
      activeTab === tabName ? globalColors.grey : globalColors.textColor,
  });
  const handleTabs = tabName => {
    setActiveTab(tabName);
  };
  const getGlobalEsims = async () => {
    try {
      const body = {
        locationCode: '!GL',
        type: '',
        slug: '',
        packageCode: '',
        iccid: '',
      };
      const res = await dispatch(getEsims(body)).unwrap();
      setGlobalEsims(res.data.packageList);
    } catch (err) {
      console.log(err);
    }
  };
  const getCart = async () => {
    try {
      await dispatch(getCartDetails()).unwrap();
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
  const verifyToken = async () => {
    try {
      const res = await dispatch(verifyUserToken()).unwrap();
      console.log(res);
    } catch (err) {
      setIsSessionExpired(true);
      console.log(err);
    }
  };
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(setToken(null));
  };

  useEffect(() => {
    getProfile();
    getGlobalEsims();
    getCart();
    if (token) {
      verifyToken();
    }
  }, []);
  return (
    <View
      style={[
        globalStyle.container,

        {
          backgroundColor: globalColors.textColor,
        },
      ]}>
      <StatusBar
        backgroundColor={globalColors.textColor}
        barStyle={'dark-content'}
      />
      <View style={[homeStyles.header]}>
        <View style={homeStyles.headerFirstSection}>
          {/* <Text style={homeStyles.headerText}>HOME</Text> */}
          <Image
            source={require('../../assets/images/auth/roam-digi-logo.png')}
            style={{width: width * 0.3, height: height * 0.03, top: -5}}
            resizeMode="stretch"
          />
          {token && (
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <Ionicons
                name="cart-outline"
                size={25}
                color={globalColors.black}
              />
              {cart?.items?.length > 0 && <View style={homeStyles.cartDot} />}
            </Pressable>
          )}
        </View>

        {/* <View style={homeStyles.inputContainer}>
          <TextInput
            style={homeStyles.input}
            placeholder="Search your country"
            placeholderTextColor={globalColors.textColor}
          />
          <MaterialIcons
            name="search"
            size={20}
            color={globalColors.textColor}
          />
        </View> */}
        <View style={homeStyles.tabContainer}>
          <Pressable
            style={[
              homeStyles.tabs,
              getTabStyle('local'),
              {
                borderTopLeftRadius: scaleValue(15),
              },
            ]}
            onPress={() => handleTabs('local')}>
            <Text style={homeStyles.tabText}>Local esims </Text>
          </Pressable>
          <Pressable
            style={[homeStyles.tabs, getTabStyle('regional')]}
            onPress={() => handleTabs('regional')}>
            <Text style={homeStyles.tabText}>Regional esims</Text>
          </Pressable>
          <Pressable
            style={[
              homeStyles.tabs,
              {
                borderTopRightRadius: scaleValue(15),
              },
              getTabStyle('global'),
            ]}
            onPress={() => handleTabs('global')}>
            <Text style={homeStyles.tabText}>Global esims</Text>
          </Pressable>
        </View>
      </View>

      {activeTab === 'global' ? (
        <FlatList
          data={globalEsims}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={homeStyles.globalContainer}
          renderItem={({item, index}) => (
            <View
              style={{
                marginBottom:
                  index === globalEsims.length - 1
                    ? height * 0.05
                    : height * 0.01,
              }}>
              <SimCard index={index} item={{...item, coverage: 'Global'}} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollView
          style={homeStyles.localContainer}
          showsVerticalScrollIndicator={false}>
          <Image
            source={banner}
            resizeMode="stretch"
            style={homeStyles.bannerStyle}
          />
          <Text style={homeStyles.localHeading}>
            {activeTab === 'local' ? 'Countries' : 'Regions'}
          </Text>

          <FlatList
            data={activeTab === 'local' ? localData : regionalData}
            contentContainerStyle={homeStyles.listContainer}
            renderItem={({item, index}) => (
              <Pressable
                style={homeStyles.listItem}
                onPress={() => navigation.navigate('AllSims', {item})}>
                <View style={homeStyles.listImageContainer}>
                  <Image source={item.image} style={homeStyles.listImage} />
                  <Text style={homeStyles.listTitle}>{item.title}</Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={scaleValue(20)}
                  color={globalColors.textColor}
                />
              </Pressable>
            )}
          />
        </ScrollView>
      )}
      <AppModal
        visible={isSessionExpired}
        title="Session Expired"
        description="Your session has expired, Please login again."
        confirmText="Login"
        onClose={() => setIsSessionExpired(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
};
export default Home;
