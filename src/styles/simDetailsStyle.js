import {StyleSheet} from 'react-native';
import {scaleValue, scaleXValue, scaleYValue} from '../constants/Sizes';
import {height, width} from '../utils';
import {globalColors} from '../constants/Colors';

export const simDetailsStyle = StyleSheet.create({
  headerText: {
    fontSize: 18,
    color: globalColors.textColor,
    fontFamily: 'Montserrat-Medium',
  },
  simTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '4.5%',
    gap: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#fff',
  },
  simBanner: {
    width: '93%',
    height: height * 0.25,
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: height * 0.03,
  },
  simTextRoot: {
    borderTopWidth: 0.5,
    borderColor: globalColors.textColor,
  },
  simIcon: {
    width: scaleXValue(25),
    height: scaleYValue(25),
    tintColor: globalColors.black,
  },
  additionalRoot: {
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.03,
    paddingBottom: height * 0.12,
    gap: height * 0.02,
    backgroundColor: globalColors.lightgrey,
  },
  additionalContainer: {
    backgroundColor: globalColors.grey,
    borderRadius: 10,
  },
  additionalItems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: width * 0.04,
    borderBottomWidth: 0.5,
  },
  additionalHeading: {fontFamily: 'Montserrat-SemiBold', fontSize: 16},
  additionalDescription: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  btnContainer: {flexDirection: 'row', alignItems: 'center', gap: width * 0.02},
  btnStyle: {
    backgroundColor: globalColors.textColor,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: 5,
  },
  btnText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  footer: {
    position: 'absolute',
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
    bottom: 0,
    // backgroundColor: '#636363',
    backgroundColor: globalColors.backgroundColor,
    paddingVertical: height * 0.015,
  },
  quantityContainer: {
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: globalColors.textColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 20,
    color: globalColors.textColor,
    fontFamily: 'Montserrat-Medium',
  },
  priceText: {
    fontFamily: 'Montserrat-Bold',
    color: globalColors.textColor,
    fontSize: 16,
  },
});
