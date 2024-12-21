import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import {StatusBar} from 'react-native';
import {globalColors} from './src/constants/Colors';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={globalColors.backgroundColor}
          barStyle={'light-content'}
        />
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
