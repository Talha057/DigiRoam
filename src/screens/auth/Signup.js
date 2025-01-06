import {
  Image,
  ScrollView,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import {globalStyle} from '../../styles/globalStyles';
import {loginStyles} from '../../styles/loginStyles';
import {globalColors} from '../../constants/Colors';
import {scaleValue} from '../../constants/Sizes';
import {logo, loginBackground, google, facebook} from '../../assets/images';
import SocialBtn from '../../components/SocialBtn';
import Feather from 'react-native-vector-icons/Feather';
import {height} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button';
import {signup} from '../../store/auth/authThunk';
import Toast from 'react-native-simple-toast';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {loading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleSignin = async () => {
    const data = {name, email, password};
    if (!name || !email || !password) {
      Toast.show('All fields are required');
      return;
    } else if (password !== confirmPass) {
      Toast.show('Passwords donot match');
      return;
    }
    try {
      const response = await dispatch(signup(data)).unwrap();
      Toast.show(response.message);
      navigation.navigate('OtpVerification', {email, key: 'verify'});
    } catch (err) {
      Toast.show(err);
    }
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={globalStyle.container}>
      <ImageBackground
        source={loginBackground}
        style={loginStyles.imageWrapper}>
        <Image source={logo} style={loginStyles.bg} />
        <Text style={loginStyles.tagline}>
          At Roamdigi, we're dedicated to providing answers to all your
          questions
        </Text>

        <View style={loginStyles.inputContainer}>
          <Text style={loginStyles.label}>Name</Text>
          <TextInput
            placeholder=""
            value={name}
            onChangeText={setName}
            style={loginStyles.email}
          />
        </View>
        <View style={loginStyles.inputContainer}>
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder=""
            value={email}
            onChangeText={setEmail}
            style={loginStyles.email}
          />
        </View>
        <View style={[loginStyles.inputContainer]}>
          <Text style={loginStyles.label}>Password</Text>
          <View style={loginStyles.passwordContainer}>
            <TextInput
              placeholder=""
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={loginStyles.password}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? 'eye' : 'eye-off'}
                size={scaleValue(20)}
                color={globalColors.textColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[loginStyles.inputContainer, {marginBottom: height * 0.05}]}>
          <Text style={loginStyles.label}>Confirm Password</Text>
          <View style={loginStyles.passwordContainer}>
            <TextInput
              placeholder=""
              secureTextEntry={!showConfirmPassword}
              value={confirmPass}
              onChangeText={setConfirmPass}
              style={loginStyles.password}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Feather
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={scaleValue(20)}
                color={globalColors.textColor}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          btnStyle={loginStyles.loginBtn}
          textStyle={loginStyles.loginText}
          onPress={handleSignin}
          title={'Signup'}
          loaderSize={scaleValue(25)}
          loading={loading}
          loaderColor={globalColors.backgroundColor}
        />
        {/* <View style={loginStyles.orWrapper}>
            <View style={loginStyles.line} />
            <Text style={loginStyles.or}>OR</Text>
            <View style={loginStyles.line}></View>
          </View>
          <View style={loginStyles.socialIconWrapper}>
            <SocialBtn image={google} style={loginStyles.socialBtn} />
            <SocialBtn image={facebook} style={loginStyles.socialBtn} />
          </View> */}
        <Text style={loginStyles.signupText}>
          Already have an account?{' '}
          <Text
            style={loginStyles.signup}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </ImageBackground>
    </ScrollView>
  );
};
export default Signup;
