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

export const cartStyles = StyleSheet.create({
  headerText: {
    fontSize: scaleValue(20),
    fontWeight: 'bold',
    color: globalColors.black,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.grey,
    borderRadius: scaleValue(10),
    padding: scaleValue(10),
    marginBottom: scaleValue(10),
  },
  cartItemImage: {
    width: scaleValue(60),
    height: scaleValue(60),
    borderRadius: scaleValue(8),
    marginRight: scaleValue(10),
    backgroundColor: '#fff',
  },
  cartItemContent: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: scaleValue(16),
    fontWeight: 'bold',
    color: globalColors.black,
  },
  cartItemPrice: {
    fontSize: scaleValue(14),
    color: globalColors.black,
    marginTop: scaleValue(4),
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: scaleValue(18),
    color: globalColors.black,
  },
});
