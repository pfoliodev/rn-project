import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store';
import Product from './screens/Product';
import { createStackNavigator } from '@react-navigation/stack';

import { View, StyleSheet, Text } from 'react-native';
import ShoppingCart from './screens/ShoppingCart';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    marginTop:40,
    fontSize: 25,
    marginLeft: 10
  }
});
