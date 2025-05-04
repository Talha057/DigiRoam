import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Pressable,
  Image,
} from 'react-native';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/Header';
import {globalStyle} from '../../styles/globalStyles';
import {globalColors} from '../../constants/Colors';
import {scaleValue} from '../../constants/Sizes';
import {cartStyles} from '../../styles/cartStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  clearCart,
  createPaymentIntent,
  getCartDetails,
  getUserEsims,
  orderProfile,
  removeFromCart,
  savePayment,
} from '../../store/main/mainThunk';
import Toast from 'react-native-simple-toast';
import {simBanner} from '../../assets/images';
import {simDetailsStyle} from '../../styles/simDetailsStyle';
import Button from '../../components/Button';
import {FlatList} from 'react-native';
import {getPriceWithMarkup} from '../../utils';
const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51PtX1yP5I2dh2w2olaE2SXdVYWT056atlVJ3jVZKliMu6GQUa17xzEQHTrELjjJRWal7JwTySuFZLdeNJ7SGwrX700LCXKN0LP';

const Cart = ({navigation, route}) => {
  const buyNow = route?.params?.buyNow;
  const dispatch = useDispatch();
  const {cart, instantBuyItem, settings} = useSelector(state => state.main);
  const [cartLoading, setCardLoading] = useState(false);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const createIntent = async () => {
    try {
      setCardLoading(true);
      const {paymentIntent, ephemeralKey, customer, transactionId} =
        await dispatch(
          createPaymentIntent({amount: totalPrice, currency: 'USD'}),
        ).unwrap();
      const {error: initError} = await initPaymentSheet({
        merchantDisplayName: 'RoamDigi',
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        customerId: customer,
        defaultBillingDetails: {
          address: 'Pakistan',
        },
      });
      if (initError) {
        console.log(initError);
        Toast.show('Payment failed');
        setCardLoading(false);
        return;
      }
      const {error: paymentError} = await presentPaymentSheet();
      if (paymentError) {
        console.log(paymentError);
        Toast.show(paymentError?.message || 'Payment failed');
        setCardLoading(false);
        return;
      }
      const orderPrice = dataToRender.reduce(
        (acc, val) => acc + val?.productPrice * 10000 * val.productQuantity,
        0,
      );
      const packageInfoList = dataToRender.map(item => ({
        count: item.productQuantity,
        price: item.productPrice * 10000,
        packageCode: item.productId,
      }));
      const orderProfileRes = await dispatch(
        orderProfile({
          amount: String(orderPrice),
          packageInfoList,
          transactionId,
        }),
      ).unwrap();
      const savePaymentPrice = dataToRender.reduce(
        (acc, val) =>
          acc +
          getPriceWithMarkup(val?.productPrice, settings?.pricePercentage) *
            10000 *
            val.productQuantity,
        0,
      );
      const savePaymentPackageInfoList = dataToRender.map(item => ({
        count: item.productQuantity,
        packageCode: item.productId,
        price:
          getPriceWithMarkup(item.productPrice, settings?.pricePercentage) *
          10000,
      }));

      const savePaymentRes = await dispatch(
        savePayment({
          orderNo: orderProfileRes.data.orderNo,
          transactionId,
          amount: savePaymentPrice,
          currency: 'USD',
          packageInfoList: savePaymentPackageInfoList,
        }),
      );
      Toast.show('Payment Successful');
      buyNow
        ? navigation.goBack()
        : await Promise.all(dispatch(clearCart()), dispatch(getCartDetails()));
      getMyEsims();
      setCardLoading(false);
    } catch (err) {
      setCardLoading(false);
      Toast.show(err);
      console.log(err);
    }
  };
  useEffect(() => {
    // fetchPublishableKey();
  }, []);
  const getCart = async () => {
    try {
      await dispatch(getCartDetails()).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  const getMyEsims = async () => {
    try {
      await dispatch(getUserEsims()).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  const dataToRender = buyNow ? [instantBuyItem] : cart?.items || [];
  const handlePaypalPress = () => {
    const packageInfoList = dataToRender.map(item => ({
      id: item.productId,
      name: item.productName,
      quantity: item.productQuantity,
      price: item.productPrice,
    }));
    console.log('packagess', packageInfoList);
    navigation.navigate('PayPalWebView', {
      amount: totalPrice,
      currency: 'USD',
      packageInfoList: packageInfoList,
      type: buyNow ? 'buynow' : 'cart',
      onSuccess: async () => {
        if (buyNow) {
          navigation.goBack();
        } else {
          console.log('helllo');
          await getCart();
        }
        await getMyEsims();
      },
    });
  };
  const handleRemoveItem = async item => {
    const data = {
      productId: item.productId,
    };
    try {
      const res = await dispatch(removeFromCart(data)).unwrap();
      Toast.show('Sim removed from cart');
    } catch (err) {
      console.log(err);
    }
  };

  const totalPrice = dataToRender.reduce(
    (acc, val) =>
      acc +
      getPriceWithMarkup(val?.productPrice, settings?.pricePercentage) *
        val.productQuantity,
    0,
  );

  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <View
        style={[
          globalStyle.container,
          {backgroundColor: globalColors.textColor},
        ]}>
        <StatusBar
          backgroundColor={globalColors.textColor}
          barStyle={'dark-content'}
        />
        <Header
          title={buyNow ? 'Pay Now' : 'Cart'}
          backgroundColor={globalColors.textColor}
          textStyle={cartStyles.headerText}
        />

        {dataToRender.length > 0 ? (
          <FlatList
            data={dataToRender}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: scaleValue(10)}}
            renderItem={({item, index}) => (
              <View style={cartStyles.cartItemContainer}>
                <Image
                  source={simBanner} // Replace with item.imageUrl if dynamic
                  style={cartStyles.cartItemImage}
                  resizeMode="contain"
                />
                <View style={cartStyles.cartItemContent}>
                  <Text style={cartStyles.cartItemTitle}>
                    {item.productName}
                  </Text>
                  <Text style={cartStyles.cartItemPrice}>
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>Price:</Text>{' '}
                    $
                    {getPriceWithMarkup(
                      item.productPrice,
                      settings.pricePercentage,
                    )}
                  </Text>
                  <Text style={cartStyles.cartItemPrice}>
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>Qty:</Text>{' '}
                    {item.productQuantity}
                  </Text>
                </View>
                {!buyNow && (
                  <Pressable onPress={() => handleRemoveItem(item)}>
                    <Ionicons
                      name="trash-outline"
                      size={scaleValue(22)}
                      color={globalColors.textColor}
                    />
                  </Pressable>
                )}
              </View>
            )}
            ListFooterComponent={
              <View style={{height: 100}} /> // Adds spacing at bottom for footer view
            }
          />
        ) : (
          <View style={cartStyles.emptyCartContainer}>
            <Text style={cartStyles.emptyCartText}>Your cart is empty.</Text>
          </View>
        )}

        {dataToRender.length > 0 && (
          <View style={simDetailsStyle.footer}>
            <Text style={simDetailsStyle.priceText}>
              ${totalPrice.toFixed(2)}
            </Text>
            <View style={cartStyles.btnContainer}>
              <Button
                title={'PayPal'}
                icon={
                  <Ionicons
                    name="logo-paypal"
                    size={15}
                    color={globalColors.textColor}
                  />
                }
                btnStyle={cartStyles.btnStyle}
                textStyle={cartStyles.btnText}
                loaderColor={globalColors.black}
                loaderSize={scaleValue(12)}
                onPress={handlePaypalPress}
              />
              <Button
                title={'Credit Card'}
                icon={
                  <Ionicons
                    name="card-outline"
                    size={15}
                    color={globalColors.textColor}
                  />
                }
                btnStyle={[
                  cartStyles.btnStyle,
                  {backgroundColor: globalColors.purple},
                ]}
                textStyle={cartStyles.btnText}
                loading={cartLoading}
                loaderColor={globalColors.textColor}
                loaderSize={scaleValue(20)}
                // onPress={handleCreditCardPayment}
                onPress={createIntent}
              />
            </View>
          </View>
        )}
      </View>
    </StripeProvider>
  );
};

export default Cart;
