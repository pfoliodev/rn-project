import NavigationContainer from './component/Navigator';
import { Provider } from 'react-redux';
import store from './store';
import Product from './screens/Product';
import { View, StyleSheet, Text } from 'react-native';

export default function App() {
  return (
      <Provider store={store}>
        <Text style={styles.mainTitle}>Zevora</Text>
        <Product></Product>
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
