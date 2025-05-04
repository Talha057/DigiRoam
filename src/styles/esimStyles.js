import {StyleSheet} from 'react-native';
import {height, width} from '../utils';
import {scaleValue} from '../constants/Sizes';
import {globalColors} from '../constants/Colors';

export const esimsStyles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: globalColors.lightgrey,
    padding: width * 0.04,
  },
  listContent: {
    padding: width * 0.02,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: globalColors.textColor,
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: height * 0.02,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  cardLeft: {
    marginRight: width * 0.04,
    backgroundColor: globalColors.lightgrey,
    padding: width * 0.025,
    borderRadius: 8,
  },
  cardRight: {
    flex: 1,
  },
  simName: {
    fontSize: scaleValue(16),
    fontFamily: 'Montserrat-SemiBold',
    color: globalColors.black,
  },
  simDetails: {
    fontSize: scaleValue(14),
    fontFamily: 'Montserrat-Medium',
    color: '#666',
    marginTop: 2,
  },
  simStatus: {
    fontSize: scaleValue(13),
    fontFamily: 'Montserrat-Medium',
    color: globalColors.backgroundColor,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
  },
  emptyText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: scaleValue(14),
    color: globalColors.black,
    textAlign: 'center',
  },
});
