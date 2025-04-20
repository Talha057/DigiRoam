import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {width, height} from '../utils';
import {globalColors} from '../constants/Colors';
import {scaleValue, scaleXValue, scaleYValue} from '../constants/Sizes';

const LoginSignupPromptModal = ({visible, onClose}) => {
  const navigation = useNavigation();

  const handleNavigate = screen => {
    onClose();
    navigation.navigate(screen);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.heading}>Login Required</Text>
          <Text style={styles.description}>
            You need to login or sign up to continue.
          </Text>

          <View style={styles.btnWrapper}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleNavigate('Login')}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, {backgroundColor: globalColors.black}]}
              onPress={() => handleNavigate('Signup')}>
              <Text style={[styles.btnText, {color: '#fff'}]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.cancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: globalColors.backgroundColor,
    padding: scaleValue(20),
    borderRadius: scaleValue(15),
    alignItems: 'center',
    shadowColor: globalColors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    elevation: 5,
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scaleXValue(18),
    marginBottom: scaleYValue(10),
    color: globalColors.textColor,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scaleXValue(14),
    color: globalColors.textColor,
    textAlign: 'center',
    marginBottom: scaleYValue(20),
  },
  btnWrapper: {
    flexDirection: 'row',
    gap: scaleXValue(10),
    marginBottom: scaleYValue(15),
  },
  btn: {
    paddingHorizontal: scaleXValue(20),
    paddingVertical: scaleYValue(8),
    backgroundColor: globalColors.textColor,
    borderRadius: scaleValue(8),
  },
  btnText: {
    color: globalColors.grey,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: scaleXValue(13),
    textAlign: 'center',
  },
  cancel: {
    marginTop: scaleYValue(5),
  },
  cancelText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scaleXValue(13),
    color: globalColors.textColor,
    textDecorationLine: 'underline',
  },
});

export default LoginSignupPromptModal;
