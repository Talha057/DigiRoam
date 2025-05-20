import {
  View,
  Image,
  ViewStyle,
  ImageStyle,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import {width} from '../utils';

const SocialBtn = ({image, style, handleOnPress}) => {
  return (
    <Pressable style={style} onPress={handleOnPress}>
      <Image source={image} style={styles.icon} />
    </Pressable>
  );
};

export default SocialBtn;

const styles = StyleSheet.create({
  socialView: {
    backgroundColor: '#F6F6F6',
    elevation: 10,
    width: width * 0.15,
    height: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  icon: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
});
