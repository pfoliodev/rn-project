import { Text, View, Button } from 'react-native';
function ShoppingCart({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>ShoppingCart</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Product')} />
      </View>
    );
  }

  export default ShoppingCart;