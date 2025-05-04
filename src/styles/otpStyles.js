import {StyleSheet} from 'react-native';
import {scaleValue, scaleXValue} from '../constants/Sizes';
import {height, width} from '../utils';
import {globalColors} from '../constants/Colors';

export const otpStyles = StyleSheet.create({
  secondContainer: {
    height: height * 0.9,
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingTop: '15%',
  },
  logo: {height: 200, width: 200, marginBottom: '8%'},
  headingContainer: {width: '100%', justifyContent: 'flex-start'},
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scaleValue(22),
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
    marginBottom: '4%',
  },
  btnText: {
    color: globalColors.textColor,
    fontSize: scaleXValue(20),
    fontFamily: 'Montserrat-Bold',
  },
  hiddenInput: {
    width: 0,
    height: 0,
    overflow: 'hidden',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.02,
    marginBottom: '8%',
  },
  codeInput: {
    width: width * 0.12,
    height: width * 0.14,
    borderRadius: scaleValue(8),
    shadowColor: globalColors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    // elevation: 5,
    backgroundColor: globalColors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    borderColor: globalColors.grey,
    borderWidth: 1,
  },
  footer: {position: 'absolute', bottom: '10%'},
  footerText: {fontFamily: 'Montserrat-Medium', fontSize: 16},
  resendNow: {
    fontFamily: 'Montserrat-Medium',
    color: globalColors.backgroundColor,
    textAlign: 'center',
    fontSize: 15,
  },
});
