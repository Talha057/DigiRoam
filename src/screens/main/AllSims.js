import {View, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {globalStyle} from '../../styles/globalStyles';
import Header from '../../components/Header';
import {globalColors} from '../../constants/Colors';
import SimCard from '../../components/SimCard';
import {width} from '../../utils';

const AllSims = ({route}) => {
  const {item} = route.params;
  return (
    <View style={globalStyle.container}>
      <Header
        title={item.title}
        backgroundColor={globalColors.textColor}
        textStyle={styles.headerText}
        arrowColor={globalColors.black}
      />
      <ScrollView style={styles.container}>
        {[0, 0, 0].map((item, index) => (
          <SimCard index={index} item={item} key={index} />
        ))}
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
