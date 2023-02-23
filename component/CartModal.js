import { StyleSheet, View, Text, Pressable, ToastAndroid } from "react-native";
import { db, collection, addDoc } from "../firebase/index"
import { resetCart } from '../redux/CartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const CartModal = ({cartData, closeModal}) => {

     const navigation = useNavigation();

    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const orderCollection = collection(db, "Order");

    const totalQuantity = cartData.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartData.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);

      const addOrder = async () => {
        await addDoc(orderCollection, {totalArticle: totalQuantity, totalPrice: totalPrice});
        resetItemToCart()
        ToastAndroid.show("Commande validée, merci pour votre achat", ToastAndroid.SHORT)
        closeModal()
        navigation.navigate('Product', {cart});
    };

    const resetItemToCart = () => {
        dispatch(resetCart());
      }

    return (
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            
            <View>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Récap de ma commande :</Text>
            </View>
            <View style={styles.recap}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Total article : {totalQuantity}</Text>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Prix total : {totalPrice} €</Text>
            </View>
            <View style={styles.btnModal}>
                <Pressable onPress={closeModal}>
                    <Text style={styles.cancel}>Annuler</Text>
                </Pressable>
                <Pressable onPress={addOrder}>
                    <Text style={styles.valid}>Valider</Text>
                </Pressable>
            </View>

        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '80%',
        height: '35%',
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    recap: {
        marginTop: 20
    },
    btnModal: {
        marginTop: 30,
        flexDirection:'row'
    },
    cancel: {
        fontSize: 20,
        color: 'red',
        padding: 8,
        borderStyle: 'solid',
        borderWidth:  2,
        borderColor: 'red',
        backgroundColor: 'white',
        marginRight:10,
        borderRadius: 3
    },
    valid: {
        fontSize: 20,
        color: 'white',
        backgroundColor: '#36F76F',
        padding: 8,
        borderStyle: 'solid',
        borderColor: '#36F76F',
        borderWidth:  2,
        borderRadius: 3
    }
});

export default CartModal;