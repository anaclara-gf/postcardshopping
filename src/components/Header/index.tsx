import React from 'react';
import {Pressable} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from '../../store/hooks';

interface Props {
  navigation: any;
  backButton: boolean;
  closeButton: boolean;
  shoppingCartButton: boolean;
}

function Header({
  navigation,
  backButton,
  closeButton,
  shoppingCartButton,
}: Props): JSX.Element {
  const products = useAppSelector(state => state.shoppingCart.products);

  const initialQuantity = 0;
  const quantity =
    products.length &&
    products.reduce((acc, curr) => acc + curr.quantity, initialQuantity);

  return (
    <View style={styles.container}>
      {backButton && (
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="angle-left" size={30} color={'white'} />
        </Pressable>
      )}
      <Text style={styles.text}>Postcards</Text>
      {shoppingCartButton && (
        <Pressable
          style={styles.shoppingCartContainer}
          onPress={() => navigation.navigate('ShoppingCart')}>
          <Icon name="shopping-cart" size={30} color={'white'} />
          {quantity > 0 && (
            <Text style={styles.shoppingCartText}>{quantity}</Text>
          )}
        </Pressable>
      )}
      {closeButton && (
        <Pressable
          style={styles.shoppingCartContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="close" size={30} color={'white'} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'black',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  shoppingCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shoppingCartText: {
    fontSize: 12,
    backgroundColor: 'red',
    height: 20,
    width: 20,
    borderRadius: 10,
    paddingTop: 1.5,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    right: -10,
    top: -5,
  },
});

export default Header;
