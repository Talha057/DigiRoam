import {StyleSheet} from 'react-native';
import {scaleValue, scaleXValue, scaleYValue} from '../constants/Sizes';
import {height, width} from '../utils';
import {globalColors} from '../constants/Colors';

export const homeStyles = StyleSheet.create({
  header: {
    gap: scaleYValue(10),
    paddingTop: height * 0.03,
    width: width * 0.92,
    alignSelf: 'center',
  },

  headerFirstSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    height: height * 0.06,
  },
  headerText: {
    color: globalColors.black,
    fontSize: scaleXValue(20),
    letterSpacing: 5,
    fontFamily: 'Montserrat-Bold',
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
    paddingVertical: height * 0.04,
  },
  globalImageContainer: {
    position: 'relative',
    width: '100%',
    borderRadius: scaleValue(20),
    marginVertical: height * 0.05,
  },
  simBanner: {
    width: 220,
    height: 130,
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
    paddingVertical: '4%',
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
    paddingVertical: height * 0.04,
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
  listContainer: {gap: 15, paddingBottom: height * 0.18},
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
  listImage: {height: 40, width: 50, borderRadius: 10},
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
});
