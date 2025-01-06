import {View, Text, Image, ImageBackground, Pressable} from 'react-native';
import {homeStyles} from '../styles/homeStyles';
import {height} from '../utils';
import {
  bannerBg,
  simBanner,
  simIcon1,
  simIcon2,
  simIcon3,
  simIcon4,
} from '../assets/images';
import {useNavigation} from '@react-navigation/native';

const SimCard = ({index, item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('SimDetails', {item: {title: 'Pakistan Sim'}})
      }>
      <ImageBackground
        source={bannerBg}
        imageStyle={{
          borderRadius: 20,
        }}
        style={[homeStyles.globalImageContainer]}>
        <Image
          source={simBanner}
          resizeMode="cover"
          style={homeStyles.simBanner}
        />
        <View style={homeStyles.simTextRoot}>
          <View style={homeStyles.simTextContainer}>
            <View style={homeStyles.simIconContainer}>
              <Image source={simIcon1} style={homeStyles.simIcon} />
              <Text style={homeStyles.simLabel}>COVERAGE</Text>
            </View>
            <Text style={homeStyles.simValue}>UNITED STATES</Text>
          </View>
          <View style={homeStyles.simTextContainer}>
            <View style={homeStyles.simIconContainer}>
              <Image source={simIcon2} style={homeStyles.simIcon} />
              <Text style={homeStyles.simLabel}>DATA</Text>
            </View>
            <Text style={homeStyles.simValue}>2 GB</Text>
          </View>
          <View style={homeStyles.simTextContainer}>
            <View style={homeStyles.simIconContainer}>
              <Image source={simIcon3} style={homeStyles.simIcon} />
              <Text style={homeStyles.simLabel}>VALIDITY</Text>
            </View>
            <Text style={homeStyles.simValue}>7 DAYS</Text>
          </View>
          <View style={homeStyles.simTextContainer}>
            <View style={homeStyles.simIconContainer}>
              <Image source={simIcon4} style={homeStyles.simIcon} />
              <Text style={homeStyles.simLabel}>PRICE</Text>
            </View>
            <Text style={homeStyles.simValue}>$ 4.0 USD</Text>
          </View>
          <View style={homeStyles.btnContainer}>
            <View style={homeStyles.btn}>
              <Text style={homeStyles.btnText}>Details</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};
export default SimCard;
