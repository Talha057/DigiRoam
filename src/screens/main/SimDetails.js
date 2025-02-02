import {Image, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
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
import {height} from '../../utils';

const SimDetails = ({route}) => {
  const {item} = route.params;
  return (
    <View style={globalStyle.container}>
      <StatusBar
        backgroundColor={globalColors.backgroundColor}
        barStyle={'light-content'}
      />
      <Header
        title={item.title}
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
              <Text style={homeStyles.simValue}>UNITED STATES</Text>
            </View>
            <View style={simDetailsStyle.simTextContainer}>
              <View style={homeStyles.simIconContainer}>
                <Image source={simIcon2} style={homeStyles.simIcon} />
                <Text style={homeStyles.simLabel}>DATA</Text>
              </View>
              <Text style={homeStyles.simValue}>2 GB</Text>
            </View>
            <View style={simDetailsStyle.simTextContainer}>
              <View style={homeStyles.simIconContainer}>
                <Image source={simIcon3} style={homeStyles.simIcon} />
                <Text style={homeStyles.simLabel}>VALIDITY</Text>
              </View>
              <Text style={homeStyles.simValue}>7 DAYS</Text>
            </View>
            <View style={simDetailsStyle.simTextContainer}>
              <View style={homeStyles.simIconContainer}>
                <Image source={simIcon4} style={homeStyles.simIcon} />
                <Text style={homeStyles.simLabel}>PRICE</Text>
              </View>
              <Text style={homeStyles.simValue}>$ 4.0 USD</Text>
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
                <Text style={simDetailsStyle.additionalHeading}>Network</Text>
                <Text style={simDetailsStyle.additionalDescription}>
                  DOCOMO
                </Text>
              </View>
            </View>
            <View style={simDetailsStyle.additionalItems}>
              <Image source={simIcon3} style={simDetailsStyle.simIcon} />
              <View style={globalStyle.flexShrink}>
                <Text style={simDetailsStyle.additionalHeading}>Plan Type</Text>
                <Text style={simDetailsStyle.additionalDescription}>
                  DATA ONLY
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
                  RESTRICTIONS APPLY TO EXTENDED USAGE (OVER 91 DAYS) IN TURKEY
                  ACCORDING TO LOCAL LEGISLATION.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={simDetailsStyle.footer}>
        <Text style={simDetailsStyle.priceText}>$9.00 USD</Text>
        <Button
          title={'Buy Now'}
          btnStyle={simDetailsStyle.btnStyle}
          textStyle={simDetailsStyle.btnText}
        />
      </View>
    </View>
  );
};
export default SimDetails;
