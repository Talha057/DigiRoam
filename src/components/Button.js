import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

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
      style={btnStyle}
      onPress={onPress}
      activeOpacity={0.5}>
      {loading ? (
        <ActivityIndicator size={loaderSize} color={loaderColor} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
export default Button;
