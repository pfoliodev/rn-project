import { Text, View, Image, StyleSheet, Pressable, ToastAndroid } from 'react-native';

const ProductItem = (props) => {
    const showMsgAddInShoppingCart = () => {
        ToastAndroid.show('Article ajouté à votre panier', ToastAndroid.SHORT);
    }

    const showMsgAddInFavorite = () => {
        ToastAndroid.show('Article ajouté à vos favoris', ToastAndroid.SHORT);
    }
    return(
        <View style={styles.container}>
            <View style={styles.productImg}>
                <Image style={styles.mainImgContent} 
                source={{ uri: props.img }} />
            </View>
            <View style={styles.content}>
                <Text style={styles.textContent}>{props.label}</Text>
                <Text numberOfLines={4} style={styles.descriptionContent}>{props.description}</Text>
                <Text style={styles.priceContent}>{props.price}</Text>

                <View style={styles.buttonContent}>
                <Pressable onPress={() => showMsgAddInShoppingCart()}>
                    <Text style={styles.shoppingCartButtonContent}>PANIER</Text>
                </Pressable>
                <Pressable onPress={() => showMsgAddInFavorite()}>
                    <Image style={styles.btnImgFavoriteContent} source={require('../assets/star.png')} />
                </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      width: 200,
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