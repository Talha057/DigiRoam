import {StyleSheet} from 'react-native';
import {scaleValue, scaleXValue, scaleYValue} from '../constants/Sizes';
import {height, width} from '../utils';
import {globalColors} from '../constants/Colors';

export const cartStyles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    color: globalColors.black,
    fontFamily: 'Montserrat-Medium',
  },
});
