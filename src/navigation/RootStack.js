import React, {useEffect, useState} from 'react';
import BottomTab from './bottomTab';
import AuthStack from './auth';
import {useSelector} from 'react-redux';

const RootStack = () => {
  const {token} = useSelector(state => state.auth);
  return <BottomTab />;
};

export default RootStack;
