import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../constants/Colors';
import {height, width} from '../utils';
import {useNavigation} from '@react-navigation/native';

const Header = ({title, backgroundColor, textStyle, arrowColor}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: globalColors.textColor}}>
      <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        <Ionicons
          name="arrow-back"
          size={20}
          color={arrowColor}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
        <View />
      </View>
    </SafeAreaView>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {
    height: height * 0.1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '4%',
  },
  textStyle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    textAlign: 'center',
    right: width * 0.02,
  },
});
