import {StyleSheet} from 'react-native';
import {scaleValue, scaleXValue, scaleYValue} from '../constants/Sizes';
import {height, width} from '../utils';
import {globalColors} from '../constants/Colors';

export const homeStyles = StyleSheet.create({
  header: {
    gap: scaleYValue(10),
    width: width * 0.92,
    paddingTop: height * 0.02,
    alignSelf: 'center',
  },
  headerFirstSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.92,
    alignSelf: 'center',
    paddingVertical: height * 0.03,
    // height: height * 0.06,
  },
  loginBtn: {
    paddingVertical: scaleValue(8),
    paddingHorizontal: scaleValue(16),
    backgroundColor: globalColors.backgroundColor,
    borderRadius: scaleValue(6),
  },
  loginText: {
    fontSize: scaleValue(16),
    color: globalColors.textColor,
    fontFamily: 'Montserrat-Medium',
  },
  headerText: {
    color: globalColors.black,
    fontSize: scaleXValue(22),
    fontFamily: 'Montserrat-Bold',
  },
  headerDescription: {
    color: globalColors.black,
    fontSize: scaleXValue(16),
    fontFamily: 'Montserrat-Regular',
  },
  cartDot: {
    borderWidth: 1,
    borderColor: globalColors.backgroundColor,
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: globalColors.backgroundColor,
    position: 'absolute',
    top: -2,
    left: -2,
  },
  inputContainer: {
    backgroundColor: globalColors.backgroundColor,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: globalColors.black,
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 1,
    elevation: 10,
    marginBottom: scaleYValue(10),
  },
  input: {
    paddingHorizontal: scaleValue(20),
    color: globalColors.textColor,
    width: '90%',
    fontFamily: 'Montserrat-Medium',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    flexShrink: 1,
  },
  tabs: {
    padding: 5,
    width: '100%',
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    top: 1,
    fontSize: scaleValue(13),
    fontFamily: 'Montserrat-SemiBold',
  },

  // Global Esims styles
  globalContainer: {
    backgroundColor: globalColors.grey,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.04,
  },
  globalImageContainer: {
    position: 'relative',
    width: '100%',
    borderRadius: scaleValue(20),
    marginVertical: height * 0.05,
  },
  simBanner: {
    width: 200,
    height: 120,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    resizeMode: 'cover',
    position: 'absolute',
    top: -height * 0.06,
  },
  simTextRoot: {
    marginTop: '27%',
    borderTopWidth: 0.5,
    borderColor: globalColors.textColor,
    marginHorizontal: '6%',
  },
  simTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '2%',
    gap: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#fff',
  },
  simIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  simIcon: {
    width: scaleXValue(20),
    height: scaleYValue(20),
  },
  simLabel: {
    color: globalColors.textColor,
    fontFamily: 'Montserrat-Regular',
    fontSize: scaleXValue(15),
  },
  simValue: {
    color: globalColors.textColor,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: scaleXValue(15),
    textTransform: 'uppercase',
    flexShrink: 1,
    textAlign: 'right',
  },

  // Regional  & Local Esims styles
  localContainer: {
    backgroundColor: globalColors.grey,
    flex: 2,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  bannerStyle: {
    width: '100%',
    height: 150,
    borderRadius: scaleValue(20),
    marginBottom: height * 0.03,
  },
  localHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scaleValue(18),
    marginBottom: scaleYValue(5),
  },
  listContainer: {gap: 15},
  listItem: {
    backgroundColor: globalColors.backgroundColor,
    paddingHorizontal: scaleXValue(10),
    paddingVertical: scaleYValue(5),
    borderRadius: scaleValue(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleValue(15),
  },
  listImage: {height: 30, width: 40, borderRadius: 10},
  listTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scaleXValue(20),
    color: globalColors.textColor,
  },
  btnContainer: {
    paddingTop: '5%',
    paddingBottom: '8%',
    paddingHorizontal: '2%',
  },
  btn: {
    backgroundColor: globalColors.textColor,
    borderRadius: 10,
  },
  btnText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    padding: 2,
  },
  text: {
    color: globalColors.black,
    fontSize: scaleXValue(18),
    marginVertical: height * 0.01,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    paddingHorizontal: width * 0.04,
  },
  listContainer: {
    paddingVertical: scaleYValue(10),
    // paddingHorizontal: width * 0.04,
    gap: scaleYValue(15),
  },
  gradientContainer: {
    height: height * 0.3,
    borderRadius: 10,
    shadowColor: globalColors.black,
    elevation: 10,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 0.5},
    justifyContent: 'center',
    marginBottom: scaleYValue(10),
  },
  iconCircle: {
    backgroundColor: '#FF7F50',
    width: scaleValue(40),

    height: scaleValue(40),
    borderRadius: scaleValue(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleYValue(15),
  },
  titleText: {
    color: globalColors.black,
    fontSize: scaleXValue(18),
    fontFamily: 'Montserrat-Bold',
  },
  descriptionText: {
    color: globalColors.black,
    fontSize: scaleXValue(15),
    fontFamily: 'Montserrat-Regular',
    paddingRight: '3%',
  },
  testimonialRoot: {
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.02,
  },
  testimonialHeader: {
    paddingVertical: height * 0.02,
  },
  testimonialHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scaleXValue(22),
    color: globalColors.black,
  },
  testimonialsContainer: {
    marginTop: scaleYValue(10),
    gap: scaleYValue(20),
  },
  testimonialItem: {
    backgroundColor: globalColors.textColor,
    paddingHorizontal: scaleValue(15),
    paddingVertical: scaleValue(10),
    flexDirection: 'row',
    borderLeftWidth: 3,
    borderLeftColor: '#FF7F50',
  },
  testimonialContent: {
    flex: 1,
  },
  customerName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scaleXValue(16),
    color: globalColors.black,
    marginBottom: scaleYValue(5),
  },
  testimonialText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scaleXValue(14),
    color: globalColors.black,
    lineHeight: scaleValue(20),
  },
  quoteIcon: {
    justifyContent: 'flex-start',
    paddingLeft: scaleValue(5),
  },
  quoteText: {
    fontSize: scaleXValue(24),
    color: '#FF7F50',
    fontFamily: 'Montserrat-Bold',
  },

  faqHeader: {
    paddingVertical: height * 0.02,
  },
  faqHeaderText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scaleXValue(26),
    color: globalColors.black,
    lineHeight: scaleValue(34),
  },
  faqDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scaleXValue(14),
    color: globalColors.black,
    lineHeight: scaleValue(20),
    marginBottom: scaleYValue(20),
  },
  faqContainer: {
    marginTop: scaleYValue(10),
    gap: scaleYValue(10),
  },
  faqItem: {
    backgroundColor: globalColors.textColor,
    borderRadius: scaleValue(8),
    marginBottom: scaleYValue(10),
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scaleValue(15),
    borderBottomColor: '#EFEFEF',
  },
  questionText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: scaleXValue(16),
    color: globalColors.black,
    flex: 1,
  },
  answerContainer: {
    padding: scaleValue(15),
    backgroundColor: '#FCFCFC',
  },
  answerText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scaleXValue(14),
    color: globalColors.lightBlack,
    lineHeight: scaleValue(22),
  },
});
