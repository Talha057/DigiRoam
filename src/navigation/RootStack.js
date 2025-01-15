import React, {useEffect, useState} from 'react';
import BottomTab from './bottomTab';
import AuthStack from './auth';
import {useSelector} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = () => {
  const {token} = useSelector(state => state.auth);
  return token ? <BottomTab /> : <AuthStack />;
  // return <BottomTab />;
};

export default RootStack;
