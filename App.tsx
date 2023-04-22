import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Products from './src/screens/Products';
import ProductDetail from './src/screens/ProductDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {Product} from './src/types/Product';

type PropsNavigationStack = {
  Products: undefined;
  ProductDetail:  {
    product: Product;
    image: string;
  };
};
export type Props = NativeStackScreenProps<PropsNavigationStack, 'ProductDetail'>;
export type PropsStack = NativeStackNavigationProp<PropsNavigationStack>;

const Stack = createNativeStackNavigator<PropsNavigationStack>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Products"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
