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
import {formatDataSize, height} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {scaleValue} from '../../constants/Sizes';
import {addToCart} from '../../store/main/mainThunk';
import Toast from 'react-native-simple-toast';
const SimDetails = ({route}) => {
  const {sim} = route.params;
  const dispatch = useDispatch();
  const {loading, cart} = useSelector(state => state.main);
  console.log('cart', cart);
  const handleCart = async () => {
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
    } catch (err) {
      console.log(err);
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
                ${sim?.price} {sim?.currencyCode}
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
          ${sim?.price} {sim?.currencyCode}
        </Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Pressable
            style={{
              paddingHorizontal: 10,
              borderRadius: 5,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20}}>-</Text>
          </Pressable>
          <Text style={{fontSize: 20}}>1</Text>
          <Pressable
            style={{paddingHorizontal: 10, borderRadius: 5, borderWidth: 1}}>
            <Text style={{fontSize: 18}}>+</Text>
          </Pressable>
        </View>
        <Button
          title={'Add to Cart'}
          btnStyle={simDetailsStyle.btnStyle}
          textStyle={simDetailsStyle.btnText}
          loading={loading}
          loaderColor={globalColors.black}
          loaderSize={scaleValue(12)}
          onPress={handleCart}
        />
      </View>
    </View>
  );
};
export default SimDetails;
