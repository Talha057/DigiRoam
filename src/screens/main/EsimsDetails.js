import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../constants/Colors';
import {scaleValue} from '../../constants/Sizes';
import {width, height} from '../../utils';
import {cartStyles} from '../../styles/cartStyles';
import Header from '../../components/Header';
import {Alert, Share, Clipboard, ToastAndroid, Platform} from 'react-native';
import {getUserEsims} from '../../store/main/mainThunk';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';

const EsimDetailsScreen = ({route, navigation}) => {
  const {esimData} = route.params;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('Profile');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabs = ['Profile', 'DataPlan', 'Coverage', 'Action'];

  const handleRefreshEsim = async () => {
    try {
      setIsRefreshing(true);
      await dispatch(getUserEsims()).unwrap();
      setIsRefreshing(false);
      Toast.show('eSIM data refreshed');
    } catch (err) {
      setIsRefreshing(false);

      console.log(err);
    }
  };

  const handleShareQrCode = async () => {
    try {
      await Share.share({
        message: `Here's my eSIM QR code: ${esimData.shortUrl}`,
        url: esimData.qrCodeUrl, // iOS only
      });
    } catch (error) {
      Toast.show('Failed to share QR code');

      console.log(error);
    }
  };

  const handleCopyPinPuk = text => {
    Clipboard.setString(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Value copied to clipboard');
    }
  };

  const handleGetSupport = () => {
    Linking.openURL('mailto:support@yourdomain.com');
  };

  const handleDeleteEsim = () => {};

  // Helper function to format bytes to GB
  const formatBytes = bytes => {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  // Helper function to calculate remaining data
  const calculateRemainingData = () => {
    const totalData = esimData.totalVolume;
    const usedData = esimData.orderUsage || 0;
    return totalData - usedData;
  };

  // Helper function to calculate usage percentage
  const calculateUsagePercentage = () => {
    if (esimData.totalVolume === 0) return 0;
    const usedData = esimData.orderUsage || 0;
    return Math.min(100, (usedData / esimData.totalVolume) * 100).toFixed(1);
  };

  // Helper function to calculate remaining percentage
  const calculateRemainingPercentage = () => {
    if (esimData.totalVolume === 0) return 100;
    const usedData = esimData.orderUsage || 0;
    return Math.max(0, 100 - (usedData / esimData.totalVolume) * 100).toFixed(
      1,
    );
  };

  // Add these helper functions for time calculations
  const calculateTimeUsed = () => {
    // If not activated yet, no time used
    if (!esimData.activateTime) return 0;

    const activationDate = new Date(esimData.activateTime);
    const currentDate = new Date();
    const expiryDate = esimData.expiredTime
      ? new Date(esimData.expiredTime)
      : null;

    // If expired, all time used
    if (expiryDate && currentDate > expiryDate) return esimData.totalDuration;

    // Calculate days elapsed since activation
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysElapsed = Math.floor((currentDate - activationDate) / msPerDay);

    return Math.min(daysElapsed, esimData.totalDuration);
  };

  const calculateTimeRemaining = () => {
    const timeUsed = calculateTimeUsed();
    return Math.max(0, esimData.totalDuration - timeUsed);
  };

  const calculateTimePercentage = () => {
    if (esimData.totalDuration === 0) return 0;
    const timeRemaining = calculateTimeRemaining();
    return Math.max(0, (timeRemaining / esimData.totalDuration) * 100).toFixed(
      1,
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <ScrollView style={styles.tabContent}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Package Name:</Text>
              <Text style={styles.detailValue}>
                {esimData.packageList[0]?.packageName || 'N/A'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expired Time:</Text>
              <Text style={styles.detailValue}>
                {esimData.expiredTime
                  ? new Date(esimData.expiredTime).toLocaleString()
                  : 'N/A'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>QR Code URL:</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(esimData.qrCodeUrl)}>
                <Text style={styles.linkText}>View QR Code</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Short URL:</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(esimData.shortUrl)}>
                <Text style={styles.linkText}>{esimData.shortUrl}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.qrCodeContainer}>
              <View style={styles.qrCode}>
                {/* In a real app, you would use a proper QR code image */}
                <Image
                  source={{uri: esimData.qrCodeUrl}}
                  style={styles.qrImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </ScrollView>
        );

      case 'DataPlan':
        return (
          <ScrollView style={styles.tabContent}>
            <View style={styles.usageCard}>
              <Text style={styles.usageTitle}>Time Usage</Text>
              <View style={styles.usageDetails}>
                <Text style={styles.usageText}>
                  Total: {esimData.totalDuration} {esimData.durationUnit}s
                </Text>
                <Text style={styles.usageText}>
                  Left: {calculateTimeRemaining()} {esimData.durationUnit}s
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      backgroundColor: globalColors.backgroundColor,
                      width: `${calculateTimePercentage()}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.percentageText}>
                {calculateTimePercentage()}%
              </Text>
            </View>

            <View style={styles.usageCard}>
              <Text style={styles.usageTitle}>Data Usage</Text>
              <View style={styles.usageDetails}>
                <Text style={styles.usageText}>
                  Total: {formatBytes(esimData.totalVolume)}
                </Text>
                <Text style={styles.usageText}>
                  Left: {formatBytes(calculateRemainingData())}
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      backgroundColor: '#4CAF50',
                      width: `${calculateRemainingPercentage()}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.percentageText}>
                {calculateRemainingPercentage()}%
              </Text>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Name:</Text>
                  <Text style={styles.infoValue}>
                    {esimData.packageList[0]?.packageName || 'N/A'}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Code:</Text>
                  <Text style={styles.infoValue}>
                    {esimData.packageList[0]?.packageCode || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Data:</Text>
                  <Text style={styles.infoValue}>
                    {formatBytes(esimData.totalVolume)}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Duration:</Text>
                  <Text style={styles.infoValue}>
                    {esimData.totalDuration} {esimData.durationUnit}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.topUpInfo}>
              <Text style={styles.topUpLabel}>Top up type:</Text>
              <Text style={styles.topUpValue}>
                {esimData.supportTopUpType === 2
                  ? 'Data is reloadable for the same area within the validity time.'
                  : 'Not reloadable'}
              </Text>
            </View>
          </ScrollView>
        );

      case 'Coverage':
        return (
          <ScrollView style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Coverage and Networks</Text>

            <View style={styles.countryContainer}>
              <View style={styles.countryFlag}>
                <View style={styles.flagPlaceholder}>
                  <Text>🇪🇸</Text>
                </View>
              </View>
              <Text style={styles.countryName}>
                {esimData.packageList[0]?.locationCode === 'ES'
                  ? 'Spain'
                  : esimData.packageList[0]?.locationCode || 'Unknown'}
              </Text>
            </View>

            <View style={styles.networksContainer}>
              {/* This would be populated from an API in a real app */}
              {['Vodafone', 'Orange', 'Movistar', 'Yoigo'].map(
                (network, index) => (
                  <View key={index} style={styles.networkRow}>
                    <Text style={styles.networkName}>{network}</Text>
                    <View style={styles.networkBadge}>
                      <Text style={styles.networkBadgeText}>5G</Text>
                    </View>
                  </View>
                ),
              )}
            </View>
          </ScrollView>
        );

      case 'Action':
        return (
          <ScrollView style={styles.tabContent}>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleRefreshEsim}
                disabled={isRefreshing}>
                {isRefreshing ? (
                  <ActivityIndicator
                    size="small"
                    color={globalColors.backgroundColor}
                  />
                ) : (
                  <Ionicons
                    name="refresh-outline"
                    size={24}
                    color={globalColors.backgroundColor}
                  />
                )}
                <Text style={styles.actionButtonText}>
                  {isRefreshing ? 'Refreshing...' : 'Refresh eSIM'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShareQrCode}>
                <Ionicons
                  name="share-outline"
                  size={24}
                  color={globalColors.backgroundColor}
                />
                <Text style={styles.actionButtonText}>Share QR Code</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons
                  name="key-outline"
                  size={24}
                  color={globalColors.backgroundColor}
                />
                <Text style={styles.actionButtonText}>View PIN/PUK</Text>
                <View style={styles.pinPukContainer}>
                  <TouchableOpacity
                    onPress={() => handleCopyPinPuk(esimData.pin)}>
                    <View style={styles.copyContainer}>
                      <Text style={styles.pinPukText}>PIN: {esimData.pin}</Text>
                      <Ionicons name="copy-outline" size={16} color="#757575" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleCopyPinPuk(esimData.puk)}>
                    <View style={styles.copyContainer}>
                      <Text style={styles.pinPukText}>PUK: {esimData.puk}</Text>
                      <Ionicons name="copy-outline" size={16} color="#757575" />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleGetSupport}>
                <Ionicons
                  name="help-circle-outline"
                  size={24}
                  color={globalColors.backgroundColor}
                />
                <Text style={styles.actionButtonText}>Get Support</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.dangerButton]}
                onPress={handleDeleteEsim}>
                <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                <Text style={[styles.actionButtonText, styles.dangerText]}>
                  Deactivate eSIM
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={'eSim details'}
        backgroundColor={globalColors.textColor}
        textStyle={cartStyles.headerText}
      />

      <View style={styles.divider} />

      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabButtonText,
                activeTab === tab && styles.activeTabButtonText,
              ]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      {renderTabContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.textColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftText: {
    marginLeft: 8,
    fontSize: scaleValue(16),
    fontFamily: 'Montserrat-SemiBold',
    color: globalColors.black,
  },
  headerTitle: {
    fontSize: scaleValue(20),
    fontFamily: 'Montserrat-Bold',
    color: globalColors.black,
  },
  closeButton: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.04,
  },
  tabButton: {
    paddingVertical: height * 0.015,
    marginRight: width * 0.06,
    position: 'relative',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: globalColors.backgroundColor,
  },
  tabButtonText: {
    fontSize: scaleValue(16),
    fontFamily: 'Montserrat-Medium',
    color: '#757575',
  },
  activeTabButtonText: {
    color: globalColors.backgroundColor,
    fontFamily: 'Montserrat-SemiBold',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: globalColors.backgroundColor,
  },
  tabContent: {
    flex: 1,
    padding: width * 0.04,
  },

  // Profile tab styles
  detailRow: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
    flexWrap: 'wrap',
  },
  detailLabel: {
    fontSize: scaleValue(16),
    fontFamily: 'Montserrat-SemiBold',
    color: globalColors.black,
    marginRight: width * 0.02,
  },
  detailValue: {
    fontSize: scaleValue(16),
    fontFamily: 'Montserrat-Medium',
    color: globalColors.black,
    flex: 1,
  },
  linkText: {
    fontSize: scaleValue(16),
    fontFamily: 'Montserrat-Medium',
    color: globalColors.backgroundColor,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  qrCode: {
    padding: width * 0.04,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  qrImage: {
    width: width * 0.6,
    height: width * 0.6,
  },

  // DataPlan tab styles
  usageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: width * 0.04,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  usageTitle: {
    fontSize: scaleValue(18),
    fontFamily: 'Montserrat-SemiBold',
    color: globalColors.black,
    marginBottom: height * 0.01,
  },
  usageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.01,
  },
  usageText: {
    fontSize: scaleValue(14),
    fontFamily: 'Montserrat-Medium',
    color: globalColors.black,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: scaleValue(12),
    fontFamily: 'Montserrat-Medium',
    color: '#757575',
    textAlign: 'right',
  },
  infoGrid: {
    marginTop: height * 0.02,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: scaleValue(14),
    fontFamily: 'Montserrat-Medium',
    color: '#757575',
  },
  infoValue: {
    fontSize: scaleValue(16),
    fontFamily: 'Montserrat-SemiBold',
    color: globalColors.black,
  },
  topUpInfo: {
    marginTop: height * 0.02,
  },
  topUpLabel: {
    fontSize: scaleValue(14),
    fontFamily: 'Montserrat-Medium',
    color: '#757575',
  },
  topUpValue: {
    fontSize: scaleValue(16),
    fontFamily: 'Montserrat-Medium',
    color: globalColors.black,
    marginTop: 4,
  },

  // Coverage tab styles
  sectionTitle: {
    fontSize: scaleValue(18),
    fontFamily: 'Montserrat-SemiBold',
    color: globalColors.black,
    marginBottom: height * 0.02,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  countryFlag: {
    marginRight: width * 0.03,
  },
  flagPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryName: {
    fontSize: scaleValue(18),
    fontFamily: 'Montserrat-SemiBold',
    color: globalColors.black,
    flexShrink: 1,
  },
  networksContainer: {
    marginTop: height * 0.02,
  },
  networkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  networkName: {
    fontSize: scaleValue(16),
    fontFamily: 'Montserrat-SemiBold',
    color: globalColors.black,
  },
  networkBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: width * 0.02,
    paddingVertical: 2,
    borderRadius: 4,
  },
  networkBadgeText: {
    fontSize: scaleValue(12),
    fontFamily: 'Montserrat-Medium',
    color: globalColors.black,
  },

  // Action tab styles
  actionContainer: {
    padding: width * 0.02,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: width * 0.04,
    borderRadius: 8,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: scaleValue(16),
    fontFamily: 'Montserrat-Medium',
    color: globalColors.black,
    marginLeft: width * 0.03,
  },
  pinPukContainer: {
    marginLeft: 'auto',
  },
  pinPukText: {
    fontSize: scaleValue(14),
    fontFamily: 'Montserrat-Medium',
    color: '#757575',
  },
  dangerButton: {
    borderColor: '#FFE5E5',
    borderWidth: 1,
  },
  dangerText: {
    color: '#FF3B30',
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 5,
    marginBottom: 4,
  },
});

export default EsimDetailsScreen;
