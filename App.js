import React, {useEffect, useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {Platform, StatusBar} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './src/navigation/auth';
import MainStack from './src/navigation/bottomTab';
import {globalColors} from './src/constants/Colors';
import {useDispatch} from 'react-redux';
import {setToken} from './src/store/auth/authSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Settings} from 'react-native-fbsdk-next';
if (Platform.OS === 'ios') {
  Settings.setAppID('514666618249229');
  Settings.initializeSDK();
}
GoogleSignin.configure({
  webClientId:
    '274572296096-anmd45dq03phbotttrh566kqlevq742u.apps.googleusercontent.com',
  iosClientId:
    '274572296096-iuigaqcq554aaeui44vffov4gpnabpib.apps.googleusercontent.com',
});
const AppEntry = () => {
  const [loading, setLoading] = useState(true);
  // const [localToken, setLocalToken] = useState(null);
  const {token} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
      // setLocalToken(storedToken);
      dispatch(setToken(storedToken));
    };

    init().finally(() => {
      setLoading(false);
      BootSplash.hide({fade: true});
    });
  }, []);

  if (loading) return null; // Optional fallback while splash is showing

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          backgroundColor={globalColors.backgroundColor}
          barStyle={'light-content'}
        />
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <AppEntry />
  </Provider>
);

export default App;
