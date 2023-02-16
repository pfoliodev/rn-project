import { ScrollView, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import ProductItem from './ProductItem';
import { useEffect, useState } from 'react';
import { db, collection, getDocs } from "../firebase/index"

function Product({ navigation }) {
  const [shoppingList, setShoppingList] = useState([]);

  const getShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "Product"));
    querySnapshot.forEach((doc) => {
    console.log(doc.data());
    
    setShoppingList({
      ...doc.data(),
      id: doc.id,
      img: doc.img,
      description: doc.description,
      label: doc.label,
      price: doc.price
    });
  });
  }
  
  useEffect(() => {
    getShoppingList()
  }, [])

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
        data={shoppingList}
        renderItem={({item}) => 
          <ProductItem 
          description={item.description} 
          img={item.img}
          label={item.label}  
          price={item.price} />}
          keyExtractor={item=>item.id}
        /> 
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    }
  });

export default Product;