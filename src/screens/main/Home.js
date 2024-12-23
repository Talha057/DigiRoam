import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
} from 'react-native';
import {globalColors} from '../../constants/Colors';
import {height, width} from '../../utils';
import {scaleValue, scaleXValue, scaleYValue} from '../../constants/Sizes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
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
} from '../../assets/images';
import {interpolate} from 'react-native-reanimated';

const Home = () => {
  const [activeTab, setActiveTab] = useState('local');
  const regionalData = [
    {title: 'Africa', image: africaMap},
    {title: 'United States', image: usMap},
    {title: 'Pakistan', image: pakMap},
    {title: 'Dubai', image: dubaiMap},
    {title: 'United Kingdom', image: ukMap},
  ];
  const localData = [
    {title: 'Pakistan', image: pakFlag},
    {title: 'United States', image: usFlag},
    {title: 'Africa', image: africaFlag},
    {title: 'Dubai', image: dubaiFlag},
    {title: 'United Kingdom', image: ukFlag},
  ];

  const getTabStyle = tabName => ({
    backgroundColor:
      activeTab === tabName ? globalColors.grey : globalColors.textColor,
  });
  const handleTabs = tabName => {
    setActiveTab(tabName);
  };
  return (
    <View style={{flex: 1, backgroundColor: globalColors.textColor}}>
      <View
        style={{
          width: width * 0.92,
          alignSelf: 'center',
        }}>
        <StatusBar
          backgroundColor={globalColors.textColor}
          barStyle={'dark-content'}
        />
        <View style={{gap: 10, paddingTop: height * 0.03}}>
          <Text
            style={{
              color: globalColors.black,
              fontSize: 20,
              letterSpacing: 5,
              fontFamily: 'Montserrat-Bold',
            }}>
            HELLO
          </Text>
          <View
            style={{
              backgroundColor: globalColors.backgroundColor,
              borderRadius: 15,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: globalColors.black,
              shadowOffset: {height: 2, width: 0},
              shadowOpacity: 1,
              elevation: 10,
              marginBottom: scaleYValue(10),
            }}>
            <TextInput
              style={{
                paddingHorizontal: scaleValue(20),
                color: globalColors.textColor,
                width: '90%',
                fontFamily: 'Montserrat-Medium',
              }}
              placeholder="Search your country"
              placeholderTextColor={globalColors.textColor}
            />
            <MaterialIcons
              name="search"
              size={20}
              color={globalColors.textColor}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              flexShrink: 1,
            }}>
            <Pressable
              style={[
                styles.tabs,
                getTabStyle('local'),
                {
                  borderTopLeftRadius: scaleValue(15),
                },
              ]}
              onPress={() => handleTabs('local')}>
              <Text style={styles.tabText}>Local esims </Text>
            </Pressable>
            <Pressable
              style={[styles.tabs, getTabStyle('regional')]}
              onPress={() => handleTabs('regional')}>
              <Text style={styles.tabText}>Regional esims</Text>
            </Pressable>
            <Pressable
              style={[
                styles.tabs,
                {
                  borderTopRightRadius: scaleValue(15),
                },
                getTabStyle('global'),
              ]}
              onPress={() => handleTabs('global')}>
              <Text style={styles.tabText}>Global esims</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: globalColors.grey,
          flex: 2,
          paddingHorizontal: width * 0.05,
          paddingVertical: height * 0.04,
        }}>
        <Image
          source={banner}
          style={{
            width: '100%',
            height: 150,
            borderRadius: 20,
            marginBottom: height * 0.03,
          }}
        />
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: scaleValue(18),
            marginBottom: scaleYValue(5),
          }}>
          {activeTab === 'local' ? 'Countries' : 'Regions'}
        </Text>

        <FlatList
          data={activeTab === 'local' ? localData : regionalData}
          contentContainerStyle={{gap: 15}}
          renderItem={({item, index}) => (
            <View
              style={{
                backgroundColor: globalColors.backgroundColor,
                paddingHorizontal: scaleXValue(10),
                paddingVertical: scaleYValue(5),
                borderRadius: scaleValue(15),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: scaleValue(15),
                }}>
                <Image
                  source={item.image}
                  style={{height: 40, width: 50, borderRadius: 10}}
                />
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: scaleValue(20),
                    color: globalColors.textColor,
                  }}>
                  {item.title}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={scaleValue(20)}
                color={globalColors.textColor}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  tabs: {
    padding: 5,
    width: '100%',
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    top: 1,
    fontSize: scaleValue(13),
    fontFamily: 'Montserrat-SemiBold',
  },
});
