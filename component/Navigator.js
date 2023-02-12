import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Product from './Product';
import Favorite from './Favorite';
import ShoppingCart from './ShoppingCart';

const Tab = createBottomTabNavigator();

function Navigator() {
    return(
        <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Favorite') {
              iconName = focused
                ? 'star'
                : 'star-outline';
            }else if (route.name === 'ShoppingCart'){
                iconName = focused ? 'cart' : 'cart-outline' 
            } else if (route.name === 'Product') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Product" component={Product} />
        <Tab.Screen name="Favorite" component={Favorite} />
        <Tab.Screen name="ShoppingCart" component={ShoppingCart} />
      </Tab.Navigator>
    </NavigationContainer>
    )
}

export default Navigator;