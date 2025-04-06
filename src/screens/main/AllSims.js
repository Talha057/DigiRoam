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

const AllSims = ({route}) => {
  const [allEsims, setAllEsims] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {item} = route.params;
  useEffect(() => {
    getAllEsims();
  }, []);
  const getAllEsims = async () => {
    try {
      const body = {
        locationCode: item.countryCode,
        type: '',
        slug: '',
        packageCode: '',
        iccid: '',
      };
      const res = await dispatch(getEsims(body)).unwrap();
      setAllEsims(res.data.packageList);
      setLoading(false);
    } catch (err) {
      console.log(err);
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
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size={20} color={'orange'} />
        ) : (
          allEsims.map((item, index) => (
            <SimCard index={index} item={item} key={index} />
          ))
        )}
      </ScrollView>
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
  },
});
