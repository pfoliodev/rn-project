import { View, Image, Text, Pressable, StyleSheet, FlatList, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { addToCart, removeFromCart } from '../redux/CartReducer';
import { db, collection, getDocs } from "../firebase/index";
import { useSelector, useDispatch } from 'react-redux';

function ProductItem () {

    const [shoppingList, setShoppingList] = useState([]);

    const getShoppingList = async () => {
      const querySnapshot = await getDocs(collection(db, "Product"));
      const shoppingListData = [];
      querySnapshot.forEach((doc) => {
        shoppingListData.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setShoppingList(shoppingListData);
    }
    
    useEffect(() => {
      getShoppingList()
    }, [])

    const navigation = useNavigation();

    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const showMsgAddInShoppingCart = (label) => {
        ToastAndroid.show(label + ' : ajouté à votre panier', ToastAndroid.SHORT);
    }

    const removeMsgInShoppingCart = (label) => {
    ToastAndroid.show(label + ' : retiré de votre panier', ToastAndroid.SHORT);
    }

    const showMsgAddInFavorite = (label) => {
        ToastAndroid.show(label + ' : ajouté à vos favoris', ToastAndroid.SHORT);
    }

    const addItemToCart = (item) => {
    showMsgAddInShoppingCart(item.label);
    dispatch(addToCart(item));
    }

    const removeItemFromCart = (item) => {
    removeMsgInShoppingCart(item.label);
    dispatch(removeFromCart(item));
    }

    function handlePress() {
        navigation.navigate('ShoppingCart', {
          cart
        });
    }

    return(
        <View>
          <FlatList
          data={shoppingList}
          renderItem={({item}) => (
          <View style={styles.productList}>
              <View style={styles.productImg}>
                  <Image style={styles.mainImgContent} 
                  source={{ uri: item.img }} />
              </View>
              <View style={styles.content}>
                  <Text style={styles.textContent}>{item.label}</Text>
                  <Text numberOfLines={4} style={styles.descriptionContent}>{item.description}</Text>
                  <Text style={styles.priceContent}>{item.price} euros</Text>

                  <View style={styles.buttonContent}>
                  {cart.some((value) => value.id == item.id) ? (
                    <Pressable onPress={() => removeItemFromCart(item)}>
                    <Text style={styles.shoppingCartRemoveButtonContent}>RETIRER</Text>
                    </Pressable>
                  ) : (
                    <Pressable onPress={() => addItemToCart(item)}>
                    <Text style={styles.shoppingCartButtonContent}>PANIER</Text>
                    </Pressable>
                  )}
                  <Pressable onPress={() => showMsgAddInFavorite(item.label)}>
                      <Image style={styles.btnImgFavoriteContent} source={require('../assets/star.png')} />
                  </Pressable>
                  </View>
              </View>
          </View>
          )}
          keyExtractor={item => item.id}/>

        <View style={styles.separator}></View>
        <View style={styles.layoutShipping}>
          <Pressable onPress={handlePress}>
            <Text style={styles.textShipping}>Mon Panier</Text>
          </Pressable>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    productList:{
        flexDirection: 'row',
        marginBottom: 70
      },
      layoutShipping:{
        justifyContent: 'center',
        flex: 1,
        flexDirection:'row',
        height: 60,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom:0
      },
      textShipping: {
        marginTop: 5,
        fontSize: 20,
        borderStyle: 'solid',
        borderWidth:  2,
        backgroundColor: 'white',
        color:'black',
        padding: 10,
        borderRadius: 3
      },
      mainImgContent: {
        width: 150,
        height: 205,
        marginStart: 20,
        marginEnd: 20,
        marginTop: 20
      },
      content: {
        marginTop: 10
      },
      textContent: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
      },
      descriptionContent: {
        color: 'grey',
        fontFamily: '',
        width: 150,
        minHeight: 75,
        marginBottom: 10,
        fontSize: 15
      },
      priceContent: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20
      },
      buttonContent: {
        flex: 1,
        flexDirection:'row'
      },
      shoppingCartButtonContent: {
        backgroundColor: 'green',
        color: "#FFF",
        fontWeight: 'bold',
        width: 120,
        height: 40,
        textAlignVertical: 'center',
        paddingStart: 35
      },
      shoppingCartRemoveButtonContent: {
        backgroundColor: 'red',
        color: "#FFF",
        fontWeight: 'bold',
        width: 120,
        height: 40,
        textAlignVertical: 'center',
        paddingStart: 35
      },
      btnImgFavoriteContent: {
        width: 40,
        height: 40
      }
});

export default ProductItem;