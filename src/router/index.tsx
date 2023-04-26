import {Product} from '../utils/types/Product';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Products from '../screens/Products';
import ProductDetail from '../screens/ProductDetail';
import ShoppingCart from '../screens/ShoppingCart';

type PropsNavigationStack = {
  Products: undefined;
  ProductDetail: {
    product: Product;
  };
  ShoppingCart: undefined;
};
export type Props = NativeStackScreenProps<
  PropsNavigationStack,
  'ProductDetail'
>;
export type PropsStack = NativeStackNavigationProp<PropsNavigationStack>;

const Stack = createNativeStackNavigator<PropsNavigationStack>();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Products"
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
