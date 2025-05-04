import {
  StatusBar,
  TextInput,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {globalStyle} from '../../styles/globalStyles';
import {globalColors} from '../../constants/Colors';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {otpLogo} from '../../assets/images';
import {width} from '../../utils';
import {otpStyles} from '../../styles/otpStyles';
import {useDebugValue, useEffect, useRef, useState} from 'react';
import Animated, {BounceIn} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {resetOtp, verifyOtp} from '../../store/auth/authThunk';
import Toast from 'react-native-simple-toast';
import {scaleValue} from '../../constants/Sizes';
const OtpVerification = ({route, navigation}) => {
  const [otp, setOtp] = useState('');
  const {email, key} = route.params;
  const {loading} = useSelector(state => state.auth);
  const inputRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const onConfirm = async () => {
    const data = {otp, email};
    try {
      const response =
        key === 'verify'
          ? await dispatch(verifyOtp(data)).unwrap()
          : await dispatch(resetOtp(data)).unwrap();
      Toast.show(response.data.message || response.message);

      navigation.replace('Login');
    } catch (err) {
      Toast.show(err);
    }
  };
  return (
    <View
      style={[
        globalStyle.container,
        {backgroundColor: globalColors.textColor},
      ]}>
      <StatusBar
        backgroundColor={globalColors.textColor}
        barStyle={'dark-content'}
      />
      <Header
        title={'VERIFICATION'}
        backgroundColor={globalColors.textColor}
        arrowColor={globalColors.black}
      />
      <ScrollView>
        <View style={otpStyles.secondContainer}>
          <Image source={otpLogo} style={otpStyles.logo} />
          <View style={otpStyles.headingContainer}>
            <Text style={otpStyles.heading}>OTP Verification</Text>
          </View>
          <TextInput
            autoFocus
            keyboardType="numeric"
            value={otp}
            onChangeText={code => code.length <= 6 && setOtp(code)}
            ref={inputRef}
            style={otpStyles.hiddenInput}
          />
          <View style={otpStyles.codeContainer}>
            {new Array(6).fill(1).map((_, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  if (inputRef.current?.isFocused()) {
                    inputRef.current.blur();
                    setTimeout(() => {
                      inputRef.current?.focus();
                    }, 100);
                  } else {
                    inputRef.current?.focus();
                  }
                }}
                style={[
                  otpStyles.codeInput,
                  index === otp.length && otpStyles.highlight,
                ]}>
                {otp[index] && (
                  <Animated.View entering={BounceIn}>
                    <Text
                      style={{
                        fontSize: 28,
                        color: globalColors.black,
                      }}>
                      {otp[index]}
                    </Text>
                  </Animated.View>
                )}
              </Pressable>
            ))}
          </View>

          <Button
            title={'Confirm'}
            onPress={onConfirm}
            textStyle={otpStyles.btnText}
            btnStyle={otpStyles.btnStyle}
            loading={loading}
            loaderSize={scaleValue(25)}
            loaderColor={globalColors.textColor}
          />
          <Text style={otpStyles.description}>
            Let me know if you'd like details about implementing OTP
            verification in your project
          </Text>
          <View style={otpStyles.footer}>
            <Text style={otpStyles.footerText}>Didn't receive code?</Text>
            <Text style={otpStyles.resendNow}>Resend Now</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default OtpVerification;
