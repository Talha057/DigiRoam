import {StatusBar, TextInput, View, Text} from 'react-native';
import {globalStyle} from '../../styles/globalStyles';
import {globalColors} from '../../constants/Colors';
import Header from '../../components/Header';
import {forgotPassStyles} from '../../styles/forgotPassStyles';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword} from '../../store/auth/authThunk';
import {useState} from 'react';
import Toast from 'react-native-simple-toast';
import {scaleValue} from '../../constants/Sizes';
import {color} from 'react-native-elements/dist/helpers';
import {loginStyles} from '../../styles/loginStyles';

const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const {loading} = useSelector(state => state.auth);
  const onSend = async () => {
    try {
      const response = await dispatch(forgotPassword({email})).unwrap();
      navigation.navigate('OtpVerification', {email, key: 'reset'});
    } catch (err) {
      Toast.show(err);
    }
  };
  return (
    <View
      style={[
        globalStyle.container,
        {backgroundColor: globalColors.backgroundColor},
      ]}>
      <StatusBar
        backgroundColor={globalColors.backgroundColor}
        barStyle={'light-content'}
      />
      <Header
        title={'FORGET PASSWORD'}
        backgroundColor={globalColors.backgroundColor}
        arrowColor={globalColors.textColor}
        textStyle={{color: globalColors.textColor}}
      />
      <View style={forgotPassStyles.secondContainer}>
        <Text style={forgotPassStyles.heading}>Forget Password</Text>
        <Text style={forgotPassStyles.description}>
          Let me know if you'd like details about implementing OTP verification
          in your project
        </Text>
        <View style={loginStyles.inputContainer}>
          <Text style={loginStyles.label}>Email</Text>
          <View style={loginStyles.passwordContainer}>
            <TextInput
              placeholder=""
              value={email}
              onChangeText={setEmail}
              style={forgotPassStyles.textInput}
            />
          </View>
        </View>

        <Button
          onPress={onSend}
          title={'Send'}
          loading={loading}
          loaderSize={scaleValue(25)}
          loaderColor={globalColors.backgroundColor}
          textStyle={forgotPassStyles.btnText}
          btnStyle={forgotPassStyles.btnStyle}
        />
      </View>
    </View>
  );
};
export default ForgotPassword;
