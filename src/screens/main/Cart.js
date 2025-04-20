import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Pressable,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/Header';
import {globalStyle} from '../../styles/globalStyles';
import {globalColors} from '../../constants/Colors';
import {scaleValue} from '../../constants/Sizes';
import {cartStyles} from '../../styles/cartStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {removeFromCart} from '../../store/main/mainThunk';
import Toast from 'react-native-simple-toast';
import {simBanner} from '../../assets/images';
import {simDetailsStyle} from '../../styles/simDetailsStyle';
import Button from '../../components/Button';
import {FlatList} from 'react-native';

const Cart = ({navigation, route}) => {
  const buyNow = route?.params?.buyNow;
  const dispatch = useDispatch();
  const {cart, instantBuyItem} = useSelector(state => state.main);

  const dataToRender = buyNow ? [instantBuyItem] : cart?.items || [];

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
    (acc, val) => acc + val.productPrice * val.productQuantity,
    0,
  );

  return (
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
                <Text style={cartStyles.cartItemTitle}>{item.productName}</Text>
                <Text style={cartStyles.cartItemPrice}>
                  <Text style={{fontFamily: 'Montserrat-Bold'}}>Price:</Text> $
                  {item.productPrice}
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
          <Text style={simDetailsStyle.priceText}>${totalPrice}</Text>
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
              loaderColor={globalColors.black}
              loaderSize={scaleValue(12)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Cart;
