import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {scaleValue, scaleXValue} from '../constants/Sizes';

const Button = ({
  btnStyle,
  textStyle,
  loading,
  onPress,
  loaderColor,
  loaderSize,
  title,
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
        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
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
  textStyle: {
    fontSize: scaleXValue(20),
    fontFamily: 'Montserrat-ExtraBold',
  },
});
