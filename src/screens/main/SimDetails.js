import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {globalStyle} from '../../styles/globalStyles';
import Header from '../../components/Header';
import {simDetailsStyle} from '../../styles/simDetailsStyle';
import {globalColors} from '../../constants/Colors';
import {homeStyles} from '../../styles/homeStyles';
import {Text} from 'react-native';
import Button from '../../components/Button';

import {
  simBanner,
  simIcon1,
  simIcon2,
  simIcon3,
  simIcon4,
} from '../../assets/images';
import {formatDataSize, getPriceWithMarkup, height} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {scaleValue} from '../../constants/Sizes';
import {addToBuyNow, addToCart} from '../../store/main/mainThunk';
import Toast from 'react-native-simple-toast';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {setInstantBuyItem} from '../../store/main/mainSlice';
import LoginSignupPromptModal from '../../components/LoginPromptModal';
import AppModal from '../../components/AppModal';
const SimDetails = ({route}) => {
  const {sim} = route.params;
  const {token} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loading, cart, settings} = useSelector(state => state.main);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const handleCart = async () => {
    if (token) {
      const data = {
        productId: sim.packageCode,
        productName: sim.name,
        productPrice: sim.price,
        productQuantity: 1,
      };
      try {
        const res = await dispatch(addToCart(data)).unwrap();
        console.log('ress', res);
        Toast.show('Sim added to cart');
        navigation.navigate('Cart');
      } catch (err) {
        console.log(err);
      }
    } else {
      setShowModal(true);
    }
  };
  const handleBuyNow = async () => {
    if (token) {
      const item = {
        productId: sim.packageCode,
        productName: sim.name,
        productPrice: sim.price,
        productQuantity: 1,
      };
      try {
        const res = await dispatch(addToBuyNow(item)).unwrap();
        dispatch(setInstantBuyItem(item));
        console.log('ress', res);
        navigation.navigate('Cart', {buyNow: true});
      } catch (err) {
        console.log(err);
      }
    } else {
      setShowModal(true);
    }
  };
  return (
    <View style={globalStyle.container}>
      <StatusBar
        backgroundColor={globalColors.backgroundColor}
        barStyle={'light-content'}
      />
      <Header
        title={'Details'}
        textStyle={simDetailsStyle.headerText}
        backgroundColor={globalColors.backgroundColor}
        arrowColor={globalColors.textColor}
      />
      <ScrollView>
        <View
          style={{
            backgroundColor: globalColors.backgroundColor,
            paddingTop: height * 0.02,
          }}>
          <Image
            source={simBanner}
            resizeMode="cover"
            style={simDetailsStyle.simBanner}
          />
          <View style={simDetailsStyle.simTextRoot}>
            <View style={simDetailsStyle.simTextContainer}>
              <View style={homeStyles.simIconContainer}>
                <Image source={simIcon1} style={homeStyles.simIcon} />
                <Text style={homeStyles.simLabel}>COVERAGE</Text>
              </View>
              <Text style={homeStyles.simValue}>{sim?.name}</Text>
            </View>
            <View style={simDetailsStyle.simTextContainer}>
              <View style={homeStyles.simIconContainer}>
                <Image source={simIcon2} style={homeStyles.simIcon} />
                <Text style={homeStyles.simLabel}>DATA</Text>
              </View>
              <Text style={homeStyles.simValue}>
                {formatDataSize(sim?.volume)}
              </Text>
            </View>
            <View style={simDetailsStyle.simTextContainer}>
              <View style={homeStyles.simIconContainer}>
                <Image source={simIcon3} style={homeStyles.simIcon} />
                <Text style={homeStyles.simLabel}>VALIDITY</Text>
              </View>
              <Text style={homeStyles.simValue}>
                {sim?.duration} {sim?.durationUnit}
              </Text>
            </View>
            <View style={simDetailsStyle.simTextContainer}>
              <View style={homeStyles.simIconContainer}>
                <Image source={simIcon4} style={homeStyles.simIcon} />
                <Text style={homeStyles.simLabel}>PRICE</Text>
              </View>
              <Text style={homeStyles.simValue}>
                {/* ${sim?.price} {sim?.currencyCode} */}$
                {getPriceWithMarkup(sim?.price, settings?.pricePercentage)}
              </Text>
            </View>
          </View>
        </View>
        <View style={simDetailsStyle.additionalRoot}>
          <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 20}}>
            Additional Information
          </Text>
          <View style={simDetailsStyle.additionalContainer}>
            <View style={simDetailsStyle.additionalItems}>
              <Image source={simIcon2} style={simDetailsStyle.simIcon} />
              <View style={globalStyle.flexShrink}>
                <Text style={simDetailsStyle.additionalHeading}>Speed</Text>
                <Text style={simDetailsStyle.additionalDescription}>
                  {sim?.speed}
                </Text>
              </View>
            </View>
            <View style={simDetailsStyle.additionalItems}>
              <Image source={simIcon3} style={simDetailsStyle.simIcon} />
              <View style={globalStyle.flexShrink}>
                <Text style={simDetailsStyle.additionalHeading}>Slug</Text>
                <Text style={simDetailsStyle.additionalDescription}>
                  {sim?.slug}
                </Text>
              </View>
            </View>
            <View style={simDetailsStyle.additionalItems}>
              <Image source={simIcon4} style={simDetailsStyle.simIcon} />
              <View style={globalStyle.flexShrink}>
                <Text style={simDetailsStyle.additionalHeading}>
                  Validity Policy
                </Text>
                <Text style={simDetailsStyle.additionalDescription}>
                  RECHARGE YOUR ACCOUNT BEFORE THE VALIDITY EXPIRES
                </Text>
              </View>
            </View>
            <View
              style={[simDetailsStyle.additionalItems, {borderBottomWidth: 0}]}>
              <Image source={simIcon4} style={simDetailsStyle.simIcon} />
              <View style={globalStyle.flexShrink}>
                <Text style={simDetailsStyle.additionalHeading}>
                  OTHER INFO
                </Text>
                <Text style={simDetailsStyle.additionalDescription}>
                  RESTRICTIONS APPLY TO EXTENDED USAGE ({sim?.unusedValidTime})
                  ACCORDING TO LOCAL LEGISLATION.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={simDetailsStyle.footer}>
        <Text style={simDetailsStyle.priceText}>
          {/* ${sim?.price} {sim?.currencyCode} */}$
          {getPriceWithMarkup(sim?.price, settings?.pricePercentage)}
        </Text>
        {/* <View style={{flexDirection: 'row', gap: 10}}>
          <Pressable
            style={simDetailsStyle.quantityContainer}
            onPress={() => {
              if (quantity > 1) setQuantity(prev => prev - 1);
            }}>
            <Text style={simDetailsStyle.quantityText}>-</Text>
          </Pressable>
          <Text style={simDetailsStyle.quantityText}>{quantity}</Text>
          <Pressable
            style={simDetailsStyle.quantityContainer}
            onPress={() => {
              if (quantity < 50) setQuantity(prev => prev + 1);
            }}>
            <Text style={[simDetailsStyle.quantityText, {fontSize: 16}]}>
              +
            </Text>
          </Pressable>
        </View> */}
        <View style={simDetailsStyle.btnContainer}>
          <Button
            title={'Add to Cart'}
            btnStyle={simDetailsStyle.btnStyle}
            textStyle={simDetailsStyle.btnText}
            onPress={handleCart}
          />
          <Button
            title={'Buy Now'}
            btnStyle={simDetailsStyle.btnStyle}
            textStyle={simDetailsStyle.btnText}
            onPress={handleBuyNow}
          />
        </View>
        <AppModal
          visible={showModal}
          title="Login Required"
          description="You need to login or signup to continue"
          confirmText="Login"
          cancelText="Cancel"
          showCancel
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false);
            navigation.navigate('Login');
          }}
        />
      </View>
    </View>
  );
};
export default SimDetails;
