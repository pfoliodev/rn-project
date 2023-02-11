import { Text, View, Button } from 'react-native';
function Product({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Product</Text>
        <Button
          title="Go to Settings"
          onPress={() => navigation.navigate('Product')}
        />
      </View>
    );
  }

export default Product;