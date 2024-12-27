import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/main/Home';
import Esim from '../../screens/main/Esim';
import Profile from '../../screens/main/Profile';
import MyTabBar from '../../components/TabBar';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Store"
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Store" component={Home} />
      <Tab.Screen name="My eSims" component={Esim} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTab;
