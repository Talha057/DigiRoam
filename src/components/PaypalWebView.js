// PayPalWebView.tsx
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {createOrderId, getCartDetails} from '../store/main/mainThunk';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {setInstantBuyItem} from '../store/main/mainSlice';
const PayPalWebView = ({route, navigation}) => {
  const {amount, currency, type, onSuccess} = route.params;
  const [approvalUrl, setApprovalUrl] = useState('');
  const dispatch = useDispatch();
  const createOrder = async () => {
    try {
      const data = {
        amount,
        currency,
        type,
      };
      const res = await dispatch(createOrderId(data)).unwrap();
      setApprovalUrl(res.approvalUrl);
    } catch (err) {
      Alert.alert('Error', 'Could not create PayPal order');
      console.log(err);
    }
  };

  useEffect(() => {
    createOrder();
  }, []);

  const handleNavigationChange = async navState => {
    const {url} = navState;
    console.log(url);
    try {
      if (url.includes('payment-success')) {
        navigation.goBack();
        Toast.show('Payment Successful');
        onSuccess();
      } else if (url.includes('payment-failure')) {
        Toast.show('Failed to process your payment');
        navigation.goBack();
      }
    } catch (error) {
      Toast.show('Failed to process your payment');
      navigation.goBack();
      console.log(error);
    }
  };

  if (!approvalUrl) {
    return <ActivityIndicator size="large" style={{flex: 1}} />;
  }

  return (
    <WebView
      source={{uri: approvalUrl}}
      onNavigationStateChange={handleNavigationChange}
      startInLoadingState
      javaScriptEnabled
      style={{flex: 1}}
    />
  );
};

export default PayPalWebView;
