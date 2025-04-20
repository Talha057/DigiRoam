// components/AppModal.js
import React from 'react';
import {
  Modal,
  Text,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {globalColors} from '../constants/Colors';
import {scaleValue} from '../constants/Sizes';

const {width, height} = Dimensions.get('window');

const AppModal = ({
  visible,
  title,
  description,
  onClose,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
  showCancel = false,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{description}</Text>

          <View style={styles.buttonRow}>
            {showCancel && (
              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.okBtn}
              onPress={onConfirm ? onConfirm : onClose}>
              <Text style={styles.okText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: globalColors.textColor,
    borderRadius: scaleValue(15),
    padding: scaleValue(20),
    width: width * 0.9,
    // alignItems: 'center',
  },
  title: {
    fontSize: scaleValue(18),
    color: globalColors.black,
    marginBottom: scaleValue(5),
    fontFamily: 'Montserrat-SemiBold',
    // textAlign: 'center',
  },
  desc: {
    fontSize: scaleValue(14),
    color: globalColors.gray,
    marginBottom: scaleValue(10),
    fontFamily: 'Montserrat-Medium',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    gap: 10,
  },
  cancelBtn: {
    paddingVertical: scaleValue(8),
    paddingHorizontal: scaleValue(16),
    backgroundColor: globalColors.backgroundColor,
    borderRadius: scaleValue(6),
  },
  cancelText: {
    fontSize: scaleValue(14),
    color: globalColors.textColor,
    fontFamily: 'Montserrat-Medium',
  },
  okBtn: {
    paddingVertical: scaleValue(8),
    paddingHorizontal: scaleValue(16),
    backgroundColor: globalColors.backgroundColor,
    borderRadius: scaleValue(6),
  },
  okText: {
    fontSize: scaleValue(14),
    color: globalColors.textColor,
    fontFamily: 'Montserrat-Medium',
  },
});
