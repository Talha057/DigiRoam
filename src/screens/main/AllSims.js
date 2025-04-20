import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {globalStyle} from '../../styles/globalStyles';
import Header from '../../components/Header';
import {globalColors} from '../../constants/Colors';
import SimCard from '../../components/SimCard';
import {width} from '../../utils';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getEsims} from '../../store/main/mainThunk';
import {Text} from 'react-native';
import {FlatList} from 'react-native';

const AllSims = ({route}) => {
  const [allEsims, setAllEsims] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {item} = route.params;
  useEffect(() => {
    getAllEsims();
  }, []);
  const getAllEsims = async () => {
    try {
      setLoading(true);
      const body = {
        locationCode: item.countryCode,
        type: '',
        slug: '',
        packageCode: '',
        iccid: '',
      };
      const res = await dispatch(getEsims(body)).unwrap();
      setAllEsims(res.data.packageList);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={globalStyle.container}>
      <Header
        title={item.title}
        backgroundColor={globalColors.textColor}
        textStyle={styles.headerText}
        arrowColor={globalColors.black}
      />
      <View style={{flex: 1, backgroundColor: globalColors.textColor}}>
        {loading ? (
          <ActivityIndicator size={20} color={globalColors.backgroundColor} />
        ) : (
          <FlatList
            data={allEsims}
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <SimCard item={item} />}
            contentContainerStyle={styles.container}
          />
        )}
      </View>
    </View>
  );
};
export default AllSims;
const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.textColor,
    padding: width * 0.05,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
  },
});
