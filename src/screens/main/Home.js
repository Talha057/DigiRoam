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
  bannerBg,
  simBanner,
} from '../../assets/images';
import {interpolate} from 'react-native-reanimated';
import {globalStyle} from '../../styles/globalStyles';
import {homeStyles} from '../../styles/homeStyles';
import SimCard from '../../components/SimCard';

const Home = ({navigation}) => {
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
    <View
      style={[
        globalStyle.container,
        {backgroundColor: globalColors.textColor},
      ]}>
      <StatusBar
        backgroundColor={globalColors.textColor}
        barStyle={'dark-content'}
      />
      <View style={homeStyles.header}>
        <Text style={homeStyles.headerText}>HELLO</Text>
        <View style={homeStyles.inputContainer}>
          <TextInput
            style={homeStyles.input}
            placeholder="Search your country"
            placeholderTextColor={globalColors.textColor}
          />
          <MaterialIcons
            name="search"
            size={20}
            color={globalColors.textColor}
          />
        </View>
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
        <ScrollView
          style={homeStyles.globalContainer}
          showsVerticalScrollIndicator={false}>
          {[0, 0, 0].map((item, index) => (
            <View
              key={index}
              style={{
                marginBottom: index === 2 ? height * 0.13 : height * 0.01,
              }}>
              <SimCard index={index} item={item} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView
          style={homeStyles.localContainer}
          showsVerticalScrollIndicator={false}>
          <Image
            source={banner}
            resizeMode="stretch"
            style={homeStyles.bannerStyle}
          />
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
        </ScrollView>
      )}
    </View>
  );
};
export default Home;
