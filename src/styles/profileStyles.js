import {StyleSheet} from 'react-native';
import {height, width} from '../utils';
import {scaleValue} from '../constants/Sizes';
import {globalStyle} from './globalStyles';
import {globalColors} from '../constants/Colors';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.lightgrey,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
  },
  headerContainer: {
    height: height * 0.1,
    backgroundColor: globalColors.textColor,
    justifyContent: 'center',
    width: width,
    paddingHorizontal: width * 0.04,
  },
  header: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
    alignItems: 'center',
  },
  avatar: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.25,
    backgroundColor: globalColors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.04,
  },
  avatarText: {
    color: 'white',
    fontSize: scaleValue(32),
    fontWeight: 'bold',
  },
  activityCard: {
    flex: 1,
    backgroundColor: globalColors.textColor,
    borderRadius: 10,
    padding: width * 0.03,
    elevation: 3,
  },
  card: {
    backgroundColor: globalColors.textColor,
    borderRadius: 10,
    padding: width * 0.03,
    marginBottom: height * 0.02,

    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',

    marginBottom: height * 0.01,
  },
  infoTextHeading: {
    fontFamily: 'Montserrat-SemiBold',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 6,
    color: globalColors.black,
    fontFamily: 'Montserrat-Medium',
  },
  input: {
    backgroundColor: globalColors.lightgrey,
    borderRadius: 8,
    padding: width * 0.03,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginBottom: height * 0.01,
  },
  saveBtnContainer: {
    flexDirection: 'row',
    gap: width * 0.015,
    marginTop: height * 0.01,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.backgroundColor,
    paddingHorizontal: 12,
    paddingVertical: height * 0.01,
    borderRadius: 6,
    gap: 5,
  },
  saveBtnText: {
    color: globalColors.textColor,
    fontFamily: 'Montserrat-Medium',
  },
  editButton: {
    marginTop: 10,
    backgroundColor: globalColors.backgroundColor,
    padding: width * 0.025,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: globalColors.textColor,
    fontFamily: 'Montserrat-SemiBold',
  },
  updateButton: {
    backgroundColor: globalColors.backgroundColor,
    padding: width * 0.025,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: {
    color: globalColors.textColor,
    fontFamily: 'Montserrat-SemiBold',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.textColor,
    padding: width * 0.03,
    elevation: 2,
    gap: 10,
    borderRadius: 10,
    shadowColor: globalColors.black,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    ...StyleSheet.absoluteFill,
  },
  modalContainer: {
    width: '90%',
    maxHeight: '70%',
    backgroundColor: globalColors.textColor,
    borderRadius: 10,
    padding: width * 0.05,
  },
  modalItem: {
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderRadius: 10,
    paddingHorizontal: scaleValue(10),
    borderBottomColor: globalColors.black,
  },
  modalItemText: {
    fontSize: scaleValue(16),
    fontFamily: 'Montserrat-Medium',
    color: globalColors.black,
  },
  modalCloseBtn: {
    marginTop: height * 0.015,
    alignSelf: 'flex-end',
  },
  modalCloseText: {
    color: 'blue',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: scaleValue(14),
  },
});
