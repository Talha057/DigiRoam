// import {StyleSheet} from 'react-native';
// import {scaleValue, scaleXValue, scaleYValue} from '../constants/Sizes';
// import {height, width} from '../utils';
// import {globalColors} from '../constants/Colors';

// export const cartStyles = StyleSheet.create({
//   headerText: {
//     fontSize: 18,
//     color: globalColors.black,
//     fontFamily: 'Montserrat-Medium',
//   },
// });
import {StyleSheet} from 'react-native';
import {scaleValue} from '../constants/Sizes';
import {globalColors} from '../constants/Colors';
import {height, width} from '../utils';

export const cartStyles = StyleSheet.create({
  headerText: {
    fontSize: scaleValue(20),
    fontFamily: 'Montserrat-Medium',
    color: globalColors.black,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.backgroundColor,
    borderRadius: scaleValue(10),
    padding: scaleValue(10),
    marginBottom: scaleValue(10),
  },
  cartItemImage: {
    width: scaleValue(60),
    height: scaleValue(60),
    borderRadius: scaleValue(8),
    marginRight: scaleValue(10),
  },
  cartItemContent: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: scaleValue(16),
    fontFamily: 'Montserrat-Bold',
    color: globalColors.textColor,
  },
  cartItemPrice: {
    fontSize: scaleValue(14),
    color: globalColors.textColor,
    marginTop: scaleValue(4),
    fontFamily: 'Montserrat-Medium',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: scaleValue(18),
    color: globalColors.black,
    fontFamily: 'Montserrat-Medium',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.02,
    justifyContent: 'flex-end',
  },
  btnStyle: {
    backgroundColor: globalColors.textColor,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    width: width * 0.3,
    borderRadius: 5,
    backgroundColor: globalColors.violet,
  },
  btnText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: globalColors.textColor,
  },
});
