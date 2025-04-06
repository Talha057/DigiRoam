import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/main/Home';
import Esim from '../../screens/main/Esim';
import Profile from '../../screens/main/Profile';
import MyTabBar from '../../components/TabBar';
import AllSims from '../../screens/main/AllSims';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SimDetails from '../../screens/main/SimDetails';
import {View} from 'react-native';
import Cart from '../../screens/main/Cart';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Store"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Store" component={Home} />
      <Tab.Screen name="My eSims" component={Esim} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
      }}>
      <Stack.Screen name="Home" component={BottomTab} />
      <Stack.Screen name="AllSims" component={AllSims} />
      <Stack.Screen name="SimDetails" component={SimDetails} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};
export default MainStack;
