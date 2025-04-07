// import {View} from 'react-native';
// import Header from '../../components/Header';
// import {globalStyle} from '../../styles/globalStyles';
// import {globalColors} from '../../constants/Colors';
// import {scaleValue} from '../../constants/Sizes';
// import {cartStyles} from '../../styles/cartStyles';

// const Cart = () => {
//   return (
//     <View style={globalStyle.container}>
//       <Header
//         title={'Cart'}
//         backgroundColor={globalColors.textColor}
//         textStyle={cartStyles.headerText}
//       />
//     </View>
//   );
// };
// export default Cart;
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
import {scaleValue, width, height} from '../../constants/Sizes';
import {cartStyles} from '../../styles/cartStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {removeFromCart} from '../../store/main/mainThunk';
import Toast from 'react-native-simple-toast';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const {cart} = useSelector(state => state.main);

  const handleRemoveItem = async item => {
    const data = {
      productId: item.productId,
    };
    console.log(data);
    try {
      const res = await dispatch(removeFromCart(data)).unwrap();
      console.log('ress', res);
      Toast.show('Sim removed from cart');
    } catch (err) {
      console.log(err);
    }
    // dispatch(removeItemFromCart(itemId)); // Example action
  };

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
        title="Cart"
        backgroundColor={globalColors.textColor}
        textStyle={cartStyles.headerText}
      />

      {cart?.items?.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: scaleValue(10)}}>
          {cart.items.map((item, index) => (
            <View key={index} style={cartStyles.cartItemContainer}>
              {console.log(item)}
              <Image
                source={{uri: item?.imageUrl}} // make sure your item has imageUrl
                style={cartStyles.cartItemImage}
                resizeMode="contain"
              />
              <View style={cartStyles.cartItemContent}>
                <Text style={cartStyles.cartItemTitle}>{item.productName}</Text>
                <Text style={cartStyles.cartItemPrice}>
                  ${item.productPrice}
                </Text>
              </View>
              <Pressable onPress={() => handleRemoveItem(item)}>
                <Ionicons
                  name="trash-outline"
                  size={scaleValue(22)}
                  color={globalColors.black}
                />
              </Pressable>
            </View>
          ))}

          {/* Add bottom spacing */}
          <View style={{height: height * 0.13}} />
        </ScrollView>
      ) : (
        <View style={cartStyles.emptyCartContainer}>
          <Text style={cartStyles.emptyCartText}>Your cart is empty.</Text>
        </View>
      )}
    </View>
  );
};

export default Cart;
