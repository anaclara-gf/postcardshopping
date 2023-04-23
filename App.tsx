import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Products from './src/screens/Products';
import ProductDetail from './src/screens/ProductDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Product} from './src/types/Product';
import {Provider} from 'react-redux';
import { store } from './src/store';
import ShoppingCart from './src/screens/ShoppingCart';

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

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Products"
          screenOptions={{
            headerShown: false,
            animation: 'none'
          }}>
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
