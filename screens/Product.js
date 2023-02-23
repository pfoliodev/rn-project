import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/index';
import ProductItem from '../component/ItemProduct';

function Product() {

  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    auth.signOut()
    .then(() => {
      navigation.replace("Login")
      ToastAndroid.show("Vous êtes à présent déconnecté", ToastAndroid.SHORT);
      resetItemToCart();
    })
    .catch(error => alert(error.message))
  }

const resetItemToCart = () => {
  dispatch(resetCart());
}

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        onPress={handleLogout}
        style={styles.button}>
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

    return (
        <View style={styles.container}>
          <ProductItem></ProductItem>
        </View>
    );
  }

  const styles = StyleSheet.create({
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    button: {
      backgroundColor: '#000',
      width: '50%',
      padding: 10,
      borderRadius: 3,
      alignItems: 'center',
      marginEnd: 5
    },
    container: {
      flex:1,
      flexDirection: 'column',
      height: '100%'
    },
    
  });

export default Product;