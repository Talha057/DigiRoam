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
    color: globalColors.textColor,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scaleValue(14),
    textAlign: 'center',
    marginBottom: '8%',
    color: globalColors.textColor,
  },
  textInput: {
    fontFamily: 'Montserrat-Medium',
    fontSize: scaleValue(17),
    borderBottomWidth: 1,
    borderBottomColor: globalColors.textColor,
    width: '100%',
    marginBottom: '6%',
    height: height * 0.065,
    color: globalColors.textColor,
  },
  btnStyle: {
    backgroundColor: globalColors.textColor,
    width: '110%',
    height: height * 0.065,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: globalColors.backgroundColor,
    fontSize: scaleXValue(20),
    fontFamily: 'Montserrat-Bold',
  },
});
