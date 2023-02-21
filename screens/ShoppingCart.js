
import { View, Image, Text, Pressable, StyleSheet, Modal, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/CartReducer';
import { useState } from 'react';
import CartModal from '../component/CartModal';


function ShoppingCart() {
    
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const increasedQuantity = (item) => {
        dispatch(incrementQuantity(item));
    }

    const removeItemFromCart = (item) => {
        dispatch(removeFromCart(item))
    }

    const decreasedQuantity = (item) => {
        if(item.quantity == 1) {
            removeItemFromCart(item)
        }else{
            dispatch(decrementQuantity(item));
        }
        
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
      }

    console.log("CartRedux : " + cart);
    return(
        <View style={styles.container}>
            <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}>
            <CartModal cartData={cart} closeModal={() => setIsModalVisible(false)}></CartModal>
        </Modal>
          {
          cart.length > 0 ?
          
          <FlatList
          data={cart}
          renderItem={({item, index}) => (
          <View key={index} style={styles.productList}>
              <View style={styles.productImg}>
                  <Image style={styles.mainImgContent} 
                  source={{ uri: item.img }} />
              </View>
              <View style={styles.content}>
                  <Text style={styles.textContent}>{item.label}</Text>
                  <Text numberOfLines={4} style={styles.descriptionContent}>{item.description}</Text>
                  <Text style={styles.priceContent}>{item.price} euros</Text>

                  <View style={styles.buttonContent}>
                    <Pressable onPress={() => decreasedQuantity(item)}>
                        <Image style={styles.btnRemove} source={require('../assets/remove.png')} />
                    </Pressable>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <Pressable onPress={() => increasedQuantity(item)}>
                        <Image style={styles.btnAdd} source={require('../assets/add.png')} />
                    </Pressable>  
                  </View>
              </View>
          </View>
          )}
          keyExtractor={item => item.id}
          /> : 
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontWeight:'bold', fontSize: 15}}>Aucun article dans le panier</Text>
            </View>
        }
        {cart.length > 0 && (
            <View style={styles.separator}>
                <View style={styles.layoutShipping}>
                    <Pressable onPress={toggleModal}>
                    <Text style={styles.textShipping}>Payer</Text>
                </Pressable>
                </View>
            </View>
        )}
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      height: '100%'
    },
    productList:{
      flexDirection: 'row'
    },
    separator: {
        height:70,
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
      flexDirection:'row',
      justifyContent: 'center',
      alignItems:'center'
    },
    btnAdd:{
        width: 40,
        height: 40
    },
    btnRemove:{
        width: 37,
        height: 37
    },
    quantity: {
        marginStart: 10,
        marginEnd: 10,
        fontWeight: 'bold'
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

export default ShoppingCart;
