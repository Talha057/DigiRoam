import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {scaleValue, scaleXValue} from '../constants/Sizes';
import {View} from 'react-native';

const Button = ({
  btnStyle,
  textStyle,
  loading,
  onPress,
  loaderColor,
  loaderSize,
  title,
  icon,
}) => {
  return (
    <TouchableOpacity
      disabled={loading}
      style={[styles.btnStyle, btnStyle]}
      onPress={onPress}
      activeOpacity={0.5}>
      {loading ? (
        <ActivityIndicator size={loaderSize} color={loaderColor} />
      ) : (
        <View style={styles.textContainer}>
          {icon && icon}
          <Text style={[styles.textStyle, textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default Button;
const styles = StyleSheet.create({
  btnStyle: {
    borderRadius: scaleValue(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {flexDirection: 'row', gap: 5, alignItems: 'center'},
  textStyle: {
    fontSize: scaleXValue(20),
    fontFamily: 'Montserrat-ExtraBold',
  },
});
