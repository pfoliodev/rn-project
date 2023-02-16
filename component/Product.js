import { ScrollView, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import ProductItem from './ProductItem';
import { useEffect, useState } from 'react';
import { db, collection, getDocs } from "../firebase/index"

function Product({ navigation }) {
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

    return (
      <SafeAreaView style={styles.container}>
        
        {
          shoppingList.length > 0 ?
      <FlatList
      data={shoppingList}
      renderItem={({item}) => (
        <ProductItem 
          description={item.description} 
          img={item.img}
          label={item.label}  
          price={item.price} 
        />
      )}
      keyExtractor={item => item.id}
    /> : 
    <ActivityIndicator/>
  }
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