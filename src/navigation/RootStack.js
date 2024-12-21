import React, {useEffect, useState} from 'react';
import BottomTab from './bottomTab';
import AuthStack from './auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = () => {
  return <AuthStack />;
};

export default RootStack;
