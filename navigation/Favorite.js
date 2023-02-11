import { Text, View, Button } from 'react-native';
function Favorite({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Favorite</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Product')} />
      </View>
    );
  }

  export default Favorite;