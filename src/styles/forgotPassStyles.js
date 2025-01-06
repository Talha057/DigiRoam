import {StyleSheet} from 'react-native';
import {scaleValue, scaleXValue, scaleYValue} from '../constants/Sizes';
import {height, width} from '../utils';
import {globalColors} from '../constants/Colors';

export const forgotPassStyles = StyleSheet.create({
  secondContainer: {
    height: '92%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
    bottom: '5%',
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scaleValue(22),
    marginBottom: '1%',
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scaleValue(14),
    textAlign: 'center',
    marginBottom: '8%',
  },
  textInput: {
    fontFamily: 'Montserrat-Medium',
    fontSize: scaleValue(17),
    borderBottomWidth: 1,
    borderBottomColor: globalColors.black,
    width: '100%',
    marginBottom: '6%',
    height: height * 0.065,
  },
  btnStyle: {
    backgroundColor: globalColors.backgroundColor,
    width: '110%',
    height: height * 0.065,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: globalColors.textColor,
    fontSize: scaleXValue(20),
    fontFamily: 'Montserrat-Bold',
  },
});
