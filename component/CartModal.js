import { StyleSheet, View, Text, Pressable, ToastAndroid } from "react-native";

const CartModal = ({cartData, closeModal}) => {

    const totalQuantity = cartData.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartData.reduce((total, item) => total + item.price, 0)

    const validOrder = () => {
        ToastAndroid.show("Commande validée, merci pour votre achat", ToastAndroid.SHORT)
        closeModal()
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
                <Pressable onPress={validOrder}>
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
        borderRadius: 3
    }
});

export default CartModal;