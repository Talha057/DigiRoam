import {StyleSheet} from 'react-native';
import {height, width} from '../utils';
import {scaleValue, scaleXValue, scaleYValue} from '../constants/Sizes';
import {globalColors} from '../constants/Colors';

export const loginStyles = StyleSheet.create({
  imageWrapper: {
    alignSelf: 'center',
    minHeight: height,
    width: width,
    padding: width * 0.07,
    justifyContent: 'center',
  },
  bg: {
    width: width * 0.5,
    left: scaleXValue(-35),
    height: height * 0.05,
    marginBottom: height * 0.025,
  },
  tagline: {
    fontSize: scaleXValue(15),
    color: globalColors.textColor,
    marginBottom: height * 0.05,
    width: width * 0.8,
    fontFamily: 'Montserrat-Medium',
  },
  inputContainer: {gap: scaleYValue(10), marginBottom: height * 0.04},
  label: {
    fontSize: scaleXValue(15),
    color: globalColors.textColor,
    fontFamily: 'Montserrat-Medium',
  },
  email: {
    height: height * 0.06,
    borderWidth: 1,
    fontSize: scaleXValue(15),
    paddingHorizontal: scaleXValue(15),
    borderColor: globalColors.textColor,
    color: globalColors.textColor,
    borderRadius: scaleXValue(18),
    fontSize: scaleXValue(15),
  },
  password: {
    height: '100%',
    width: width * 0.68,

    fontFamily: 'Poppins-Regular',
    fontSize: scaleXValue(15),
    color: globalColors.textColor,
  },
  passwordContainer: {
    justifyContent: 'space-between',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.06,
    borderColor: globalColors.textColor,
    borderRadius: scaleXValue(18),
    paddingHorizontal: scaleXValue(15),
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: height * 0.035,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleXValue(3),
  },
  rememberText: {
    color: globalColors.textColor,
    fontSize: scaleXValue(15),
    fontFamily: 'Montserrat-Medium',
  },
  forgotpass: {
    color: globalColors.textColor,
    fontSize: scaleXValue(15),
    fontFamily: 'Montserrat-Medium',
  },
  loginBtn: {
    backgroundColor: globalColors.textColor,
    height: width * 0.14,
    borderRadius: scaleValue(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  loginText: {
    fontSize: scaleXValue(20),
    fontFamily: 'Montserrat-ExtraBold',
    color: globalColors.backgroundColor,
  },
  orWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: width * 0.05,
    marginBottom: height * 0.02,
  },
  line: {
    width: width * 0.35,
    height: 1,
    backgroundColor: '#fff',
  },
  or: {
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  socialIconWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: height * 0.03,
  },
  socialBtn: {
    backgroundColor: '#F6F6F6',
    elevation: 10,
    width: width * 0.12,
    height: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  signupText: {
    color: globalColors.textColor,
    fontSize: scaleXValue(15),
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  signup: {textDecorationLine: 'underline'},
});
