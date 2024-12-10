import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName=""
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => <></>,
        }}
        name=""
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
