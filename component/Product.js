import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import ProductItem from './ProductItem';

function Product({ navigation }) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollview}>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    }
  });

export default Product;