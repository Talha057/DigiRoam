import {
  View,
  Platform,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import {Text, PlatformPressable} from '@react-navigation/elements';
import {globalColors} from '../constants/Colors';
import {width} from '../utils';
import {esimIcon, homeIcon, profileIcon} from '../assets/images';
import {scaleValue, scaleYValue} from '../constants/Sizes';
import {color} from 'react-native-elements/dist/helpers';
import {useEffect, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

function MyTabBar({state, descriptors, navigation, token}) {
  const [barDimensions, setBarDimensions] = useState({
    height: 20,
    width: 100,
  });
  const isKeyboardVisible = useSharedValue(0);
  const onTabbarLayout = e => {
    setBarDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };
  const buttonWidth = barDimensions.width / state.routes.length;
  const tabPositionX = useSharedValue(0);
  const tabStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      backgroundColor: globalColors.textColor,
      borderRadius: 50,
      marginHorizontal: 15,
      height: barDimensions.height - 10,
      width: buttonWidth - 30,
      transform: [{translateX: tabPositionX.value}],
    };
  });
  useEffect(() => {
    tabPositionX.value = withSpring(buttonWidth * state.index, {
      duration: 1500,
    });
  }, [state.index]);
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardDidShow', () => {
      isKeyboardVisible.value = 1; // Keyboard visible
    });

    const keyboardWillHide = Keyboard.addListener('keyboardDidHide', () => {
      isKeyboardVisible.value = 0; // Keyboard hidden
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);
  const keyboardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(isKeyboardVisible.value === 1 ? 100 : 0, {
          duration: 250,
        }),
      },
    ],
    opacity: withTiming(isKeyboardVisible.value === 1 ? 0 : 1, {
      duration: 250,
    }),
  }));
  const icon = {
    Store: props => (
      <Image
        source={homeIcon}
        style={[styles.icon, {tintColor: props.color}]}
      />
    ),
    'My eSims': props => (
      <Image
        source={esimIcon}
        style={[styles.icon, {tintColor: props.color}]}
      />
    ),
    Profile: props => (
      <Image
        source={profileIcon}
        style={[styles.icon, {tintColor: props.color}]}
      />
    ),
  };
  return (
    <Animated.View
      onLayout={onTabbarLayout}
      style={[styles.tabBar, keyboardStyle]}>
      {token && <Animated.View style={tabStyle} />}
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = token ? state.index === index : false;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}>
            {icon[route.name]({
              color: isFocused
                ? globalColors.backgroundColor
                : globalColors.textColor,
            })}
            <Text
              style={{
                color: isFocused
                  ? globalColors.backgroundColor
                  : globalColors.textColor,
                fontFamily: 'Montserrat-Medium',
                fontSize: scaleValue(13),
              }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </Animated.View>
  );
}
export default MyTabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: globalColors.backgroundColor,
    marginHorizontal: width * 0.04,
    paddingVertical: scaleYValue(10),
    borderRadius: scaleValue(20),
    shadowColor: '#000',
    shadowOffset: {height: 10, width: 0},
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 10,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  icon: {width: 25, height: 25},
});
