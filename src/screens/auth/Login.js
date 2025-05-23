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
import CheckBox from 'react-native-check-box';
import {useDispatch, useSelector} from 'react-redux';
import {facebookLogin, googleLogin, login} from '../../store/auth/authThunk';
import Toast from 'react-native-simple-toast';
import Button from '../../components/Button';
import {setToken} from '../../store/auth/authSlice';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
import {apiManager} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {loading} = useSelector(state => state.auth);
  const toggleCheckbox = () => setChecked(!checked);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    const data = {email, password};
    try {
      const response = await dispatch(login(data)).unwrap();
      Toast.show(response.message);
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (err) {
      if (err.code === 403) {
        navigation.navigate('OtpVerification', {email, key: 'verify'});
      }
      Toast.show(err.message);
    }
  };
  const handleGoogle = async () => {
    try {
      const response = await dispatch(googleLogin()).unwrap();
      Toast.show(response.message);
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (err) {
      Toast.show(err.message);
      console.log(err);
    }
  };
  const handleFacebookLogin = async () => {
    // try {
    //   const response = await dispatch(facebookLogin());
    //   Toast.show(response.message);
    //   navigation.reset({
    //     index: 0,
    //     routes: [{name: 'Home'}],
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        console.log('login cancelled');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        console.log('something went wrong');
        return;
      }

      const profile = await Profile.getCurrentProfile();
      console.log(profile);
      console.log({
        provider: 'facebook',
        providerId: profile?.userID, // socialID of google|facebook|apple
        email: profile?.email, // user email retrieved from google|facebook|apple
        name: profile?.name, // user name retrieved from google|facebook|apple
      });
      const response = await apiManager.post('/auth/native/callback', {
        provider: 'facebook',
        providerId: profile?.userID, // socialID of google|facebook|apple
        email: profile?.email, // user email retrieved from google|facebook|apple
        name: profile?.name, // user name retrieved from google|facebook|apple
      });
      AsyncStorage.setItem('token', JSON.stringify(response.data.accessToken));
      Toast.show(response.message);
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (err) {
      console.log(err);
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
          <Text style={loginStyles.label}>User name or Email</Text>
          <TextInput
            placeholder=""
            value={email}
            onChangeText={setEmail}
            style={loginStyles.email}
          />
        </View>
        <View style={[loginStyles.inputContainer, {marginBottom: 0}]}>
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

        <View style={loginStyles.rememberContainer}>
          <View style={loginStyles.checkboxContainer}>
            {/* <CheckBox
              onClick={toggleCheckbox}
              isChecked={checked}
              checkedCheckBoxColor="#fff"
              checkBoxColor="#fff"
            />
            <Text style={loginStyles.rememberText}>Remember Me</Text> */}
          </View>
          <Text
            style={loginStyles.forgotpass}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password
          </Text>
        </View>
        <Button
          btnStyle={loginStyles.loginBtn}
          textStyle={loginStyles.loginText}
          onPress={handleLogin}
          title={'Login'}
          loaderSize={scaleValue(25)}
          loading={loading}
          loaderColor={globalColors.backgroundColor}
        />

        <View style={loginStyles.orWrapper}>
          <View style={loginStyles.line} />
          <Text style={loginStyles.or}>OR</Text>
          <View style={loginStyles.line}></View>
        </View>
        <View style={loginStyles.socialIconWrapper}>
          <SocialBtn
            image={google}
            style={loginStyles.socialBtn}
            handleOnPress={handleGoogle}
          />
          <SocialBtn
            image={facebook}
            style={loginStyles.socialBtn}
            handleOnPress={handleFacebookLogin}
          />
        </View>
        <Text style={loginStyles.signupText}>
          New User?{' '}
          <Text
            style={loginStyles.signup}
            onPress={() => navigation.navigate('Signup')}>
            Signup
          </Text>
        </Text>
      </ImageBackground>
    </ScrollView>
  );
};
export default Login;
