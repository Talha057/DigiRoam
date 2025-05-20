import {
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {globalColors} from '../../constants/Colors';
import {height, width} from '../../utils';
import {scaleValue, scaleXValue, scaleYValue} from '../../constants/Sizes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect, useState} from 'react';
import {
  africaMap,
  banner,
  pakMap,
  usMap,
  dubaiMap,
  ukMap,
  usFlag,
  pakFlag,
  africaFlag,
  dubaiFlag,
  ukFlag,
  saudiFlag,
  thaiFlag,
} from '../../assets/images';
import {globalStyle} from '../../styles/globalStyles';
import {homeStyles} from '../../styles/homeStyles';
import SimCard from '../../components/SimCard';
import {
  getCartDetails,
  getEsims,
  getSettings,
  verifyUserToken,
} from '../../store/main/mainThunk';
import {useDispatch, useSelector} from 'react-redux';
import {getMyProfile, settings} from '../../store/auth/authThunk';
import AppModal from '../../components/AppModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../../store/auth/authSlice';
import LinearGradient from 'react-native-linear-gradient';
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('local');
  const [globalEsims, setGlobalEsims] = useState([]);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const {cart, settings} = useSelector(state => state.main);
  const {token} = useSelector(state => state.auth);
  const regionalData = [
    {title: 'Africa', image: africaMap, countryCode: '!RG'},
    {title: 'United States', image: usMap, countryCode: '!RG'},
    {title: 'Pakistan', image: pakMap, countryCode: '!RG'},
    {title: 'Dubai', image: dubaiMap, countryCode: '!RG'},
    {title: 'United Kingdom', image: ukMap, countryCode: '!RG'},
  ];
  const localData = [
    {title: 'United Arab Emirates', image: dubaiFlag, countryCode: 'AE'},
    {title: 'United States', image: usFlag, countryCode: 'US'},
    {title: 'Saudi Arabia', image: saudiFlag, countryCode: 'KSA'},
    {title: 'United Kingdom', image: ukFlag, countryCode: 'GB'},
    {title: 'Thailand', image: thaiFlag, countryCode: 'TH'},
  ];
  const cardsData = [
    {
      id: '1',
      iconName: 'all-inclusive', // Infinity icon
      title: 'Hassle Free Data Connection',
      description:
        'Enjoy Hassle Free Data Connection at your destination without the burden of roaming charges.',
    },
    {
      id: '2',
      iconName: 'phone-android', // Mobile icon
      title: 'Keep using your fav apps',
      description:
        'Get that safe ride home, find that great restaurant, and pin the local attractions, all while staying connected with your loved ones.',
    },
    {
      id: '3',
      iconName: 'message', // Message icon
      title: 'WhatsApp number',
      description:
        "You can call and message all your contacts on WhatsApp, like you're in the same country. Don't lose touch with family and friends.",
    },
    {
      id: '4',
      iconName: 'headset', // Headphone icon
      title: '24/7 Customer Support',
      description:
        'In need of assistance? Our 24/7 chat support is just a message away to keep you connected and help you with everything you need.',
    },
    {
      id: '5',
      iconName: 'rocket', // Rocket icon
      title: 'Fast & Internet Connection',
      description:
        "Connect to the best networks at your destination and get internet that's both reliable and fast.",
    },
    {
      id: '6',
      iconName: 'sim-card', // SIM icon
      title: 'Enjoy your eSim',
      description:
        'Enjoy the flexibility of our digital eSIM while keeping the option to use your original SIM as usual whenever you need it.',
    },
  ];
  const testimonials = [
    {
      name: 'Mike',
      text: "I am satisfied with ROAMDIGI's eSIM services. The convenience of having multiple eSIM profiles on my phone is incredible. It has helped me to seamlessly use one number for work and another for personal use, all on the same device.",
    },
    {
      name: 'Saqlain',
      text: 'Using ROAMDIGI has greatly enhanced my eSIM experience. I initially had concerns about network performance, but my eSIM works seamlessly. Plus, I save money by opting for local data plans instead of paying expensive roaming fees!',
    },
    {
      name: 'Sumita',
      text: "Switching to an eSIM was the best decision! Roamdigi's eSIM offers customer-friendly services as it eliminates the need to swap physical SIM cards while traveling. I activated my plan instantly, and the connection was smooth and hassle-free.",
    },
  ];

  const [expandedFAQ, setExpandedFAQ] = useState('');

  const faqs = [
    {
      question: 'What products do you offer?',
      answer:
        'We offer eSIM services, which provide a convenient and flexible way to connect to mobile networks without the need for a physical SIM card. Our eSIM allows you to activate mobile data, make calls, and send messages on compatible devices, all with a simple digital activation process.',
    },
    {
      question: 'How do I create an account?',
      answer:
        "To create an account, simply click on the 'Sign Up' button on our website or mobile app. Follow the prompts to enter your information and set up your account. It's quick and easy!",
    },
    {
      question: 'Do you have a mobile app?',
      answer:
        'Yes, we have a mobile app available for both iOS and Android devices. You can download it from the App Store or Google Play Store. Our app offers all the features of our website, plus some exclusive mobile-only benefits.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can reach our customer support team through various channels. We offer 24/7 support via live chat on our website and mobile app. You can also email us at support@roamdigi.com.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept a wide range of payment methods including major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. For some regions, we also offer local payment options. You can view all available payment methods during checkout.',
    },
  ];

  const toggleFAQ = question => {
    if (expandedFAQ === question) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(question);
    }
  };
  const getTabStyle = tabName => ({
    backgroundColor:
      activeTab === tabName ? globalColors.grey : globalColors.textColor,
  });
  const handleTabs = tabName => {
    setActiveTab(tabName);
  };
  const getGlobalEsims = async () => {
    try {
      const body = {
        locationCode: '!GL',
        type: '',
        slug: '',
        packageCode: '',
        iccid: '',
      };
      const res = await dispatch(getEsims(body)).unwrap();
      setGlobalEsims(res.data.packageList);
    } catch (err) {
      console.log(err);
    }
  };
  const getCart = async () => {
    try {
      await dispatch(getCartDetails()).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  const getProfile = async () => {
    try {
      await dispatch(getMyProfile()).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  const getGlobalSettings = async () => {
    try {
      await dispatch(getSettings()).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const verifyToken = async () => {
    try {
      const res = await dispatch(verifyUserToken()).unwrap();
      console.log(res);
    } catch (err) {
      if (err?.code === 401) {
        setIsSessionExpired(true);
      }
      console.log('errrrr', err);
    }
  };
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(setToken(null));
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  useEffect(() => {
    getProfile();
    getGlobalEsims();
    getCart();
    getGlobalSettings();
    if (token) {
      verifyToken();
    }
  }, []);
  return (
    <SafeAreaView
      style={[
        globalStyle.container,

        {
          backgroundColor: globalColors.textColor,
        },
      ]}
      edges={['top']}>
      <StatusBar
        backgroundColor={globalColors.textColor}
        barStyle={'dark-content'}
      />

      <View style={homeStyles.headerFirstSection}>
        <Image
          source={require('../../assets/images/auth/roam-digi-logo.png')}
          style={{width: width * 0.3, height: height * 0.03, top: -5}}
          resizeMode="stretch"
        />
        {token ? (
          <Pressable onPress={() => navigation.navigate('Cart')}>
            <Ionicons
              name="cart-outline"
              size={25}
              color={globalColors.black}
            />
            {cart?.items?.length > 0 && <View style={homeStyles.cartDot} />}
          </Pressable>
        ) : (
          <TouchableOpacity
            style={homeStyles.loginBtn}
            onPress={() => navigation.navigate('Login')}>
            <Text style={homeStyles.loginText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[homeStyles.header]}>
          <Text style={homeStyles.headerText}>
            Smart Journey, stay connected{' '}
            <Text style={{color: globalColors.backgroundColor}}>
              Global eSIM
            </Text>{' '}
            with user-friendly prices
          </Text>
          <Text style={homeStyles.headerDescription}>
            Enjoy internet connection on every adventure and forget about
            expensive roaming bills upon your return.
          </Text>

          <View style={homeStyles.tabContainer}>
            <Pressable
              style={[
                homeStyles.tabs,
                getTabStyle('local'),
                {
                  borderTopLeftRadius: scaleValue(15),
                },
              ]}
              onPress={() => handleTabs('local')}>
              <Text style={homeStyles.tabText}>Local esims </Text>
            </Pressable>
            <Pressable
              style={[homeStyles.tabs, getTabStyle('regional')]}
              onPress={() => handleTabs('regional')}>
              <Text style={homeStyles.tabText}>Regional esims</Text>
            </Pressable>
            <Pressable
              style={[
                homeStyles.tabs,
                {
                  borderTopRightRadius: scaleValue(15),
                },
                getTabStyle('global'),
              ]}
              onPress={() => handleTabs('global')}>
              <Text style={homeStyles.tabText}>Global esims</Text>
            </Pressable>
          </View>
        </View>

        {activeTab === 'global' ? (
          <FlatList
            data={globalEsims}
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={homeStyles.globalContainer}
            renderItem={({item, index}) => (
              <View
                style={
                  {
                    // marginBottom:
                    //   index === globalEsims.length - 1
                    //     ? height * 0.05
                    //     : height * 0.01,
                  }
                }>
                <SimCard index={index} item={{...item, coverage: 'Global'}} />
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View
            style={homeStyles.localContainer}
            showsVerticalScrollIndicator={false}>
            {/* <Image
              source={banner}
              resizeMode="stretch"
              style={homeStyles.bannerStyle}
            /> */}
            <Text style={homeStyles.localHeading}>
              {activeTab === 'local' ? 'Countries' : 'Regions'}
            </Text>

            <FlatList
              data={activeTab === 'local' ? localData : regionalData}
              contentContainerStyle={homeStyles.listContainer}
              renderItem={({item, index}) => (
                <Pressable
                  style={homeStyles.listItem}
                  onPress={() => navigation.navigate('AllSims', {item})}>
                  <View style={homeStyles.listImageContainer}>
                    <Image source={item.image} style={homeStyles.listImage} />
                    <Text style={homeStyles.listTitle}>{item.title}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={scaleValue(20)}
                    color={globalColors.textColor}
                  />
                </Pressable>
              )}
            />
          </View>
        )}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={homeStyles.text}>
            Enjoy reliable and affordable internet in your trips. We get you
            covered.
          </Text>
          <FlatList
            data={cardsData}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              padding: width * 0.04,
            }}
            renderItem={({item}) => (
              <LinearGradient
                colors={['#FFFFFF', '#FFB36B']}
                style={homeStyles.gradientContainer}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <View style={{paddingLeft: '5%'}}>
                  <View style={homeStyles.iconCircle}>
                    <MaterialIcons
                      name={item.iconName}
                      size={24}
                      color={globalColors.textColor}
                    />
                  </View>

                  <Text style={homeStyles.titleText}>{item.title}</Text>

                  <Text style={homeStyles.descriptionText}>
                    {item.description}
                  </Text>
                </View>
              </LinearGradient>
            )}
          />
        </View>
        {/* Testimonials */}
        <View style={homeStyles.testimonialRoot}>
          <View style={homeStyles.testimonialHeader}>
            <Text style={homeStyles.testimonialHeading}>
              What Our Customers Said
            </Text>
          </View>

          <View style={homeStyles.testimonialsContainer}>
            {testimonials.map((item, index) => (
              <View key={index} style={homeStyles.testimonialItem}>
                <View style={homeStyles.testimonialContent}>
                  <Text style={homeStyles.customerName}>{item.name}</Text>
                  <Text style={homeStyles.testimonialText}>{item.text}</Text>
                </View>
                <View style={homeStyles.quoteIcon}>
                  <Text style={homeStyles.quoteText}>❞</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* FAQ's */}
        <View style={homeStyles.testimonialRoot}>
          <View style={homeStyles.faqHeader}>
            <Text style={homeStyles.faqHeaderText}>
              Any questions we got you.
            </Text>
          </View>

          <Text style={homeStyles.faqDescription}>
            At Roamdigi, we're dedicated to providing answers to all your
            questions. Whether you need information, assistance, or advice, our
            team is here to help. We ensure that you get the support you need
            with quick, accurate, and reliable solutions. Don't hesitate to
            reach out, we're just a click away!
          </Text>
        </View>

        <View style={homeStyles.faqContainer}>
          {faqs.map((faq, index) => (
            <View key={index} style={homeStyles.faqItem}>
              <TouchableOpacity
                style={[
                  homeStyles.questionContainer,
                  {
                    borderBottomWidth: expandedFAQ ? 1 : 0,
                  },
                ]}
                onPress={() => toggleFAQ(faq.question)}>
                <Text style={homeStyles.questionText}>{faq.question}</Text>
                <Ionicons
                  name={expandedFAQ === faq.question ? 'remove' : 'add'}
                  size={20}
                  color={globalColors.black}
                />
              </TouchableOpacity>

              {expandedFAQ === faq.question && (
                <View style={homeStyles.answerContainer}>
                  <Text style={homeStyles.answerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <AppModal
        visible={isSessionExpired}
        title="Session Expired"
        description="Your session has expired, Please login again."
        confirmText="Login"
        onClose={() => setIsSessionExpired(false)}
        onConfirm={handleLogout}
      />
    </SafeAreaView>
  );
};
export default Home;
