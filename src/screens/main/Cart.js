import {View} from 'react-native';
import Header from '../../components/Header';
import {globalStyle} from '../../styles/globalStyles';
import {globalColors} from '../../constants/Colors';
import {scaleValue} from '../../constants/Sizes';
import {cartStyles} from '../../styles/cartStyles';

const Cart = () => {
  return (
    <View style={globalStyle.container}>
      <Header
        title={'Cart'}
        backgroundColor={globalColors.textColor}
        textStyle={cartStyles.headerText}
      />
    </View>
  );
};
export default Cart;
