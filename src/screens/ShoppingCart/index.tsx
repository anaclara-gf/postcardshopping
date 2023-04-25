import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {useAppSelector} from '../../store/hooks';
import InputSpinner from '../../components/InputSpinner';
import { PropsStack } from '../../router';

function ShoppingCart(): JSX.Element {
  const navigation = useNavigation<PropsStack>();

  const products = useAppSelector(state => state.shoppingCart.products);
  const totalProducts = products.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = `R$${15 * totalProducts},00`;

  return (
    <View style={styles.container}>
      <Header
        backButton={false}
        closeButton={true}
        shoppingCartButton={false}
      />
      <View style={styles.productsContainer}>
        <Text style={styles.pageTitle}>Seu carrinho</Text>
        {products.length ? (
          <View style={styles.contentContainer}>
            <ScrollView style={styles.productsListContainer}>
              <View style={styles.productsList}>
                {products.map(product => {
                  const price = `R$${15 * product.quantity},00`;
                  return (
                    <View key={product.product.id}>
                      <Pressable
                        key={product.product.id}
                        testID='productTileTestId'
                        style={styles.product}
                        onPress={() => {
                          navigation.navigate('ProductDetail', {
                            product: product.product,
                          });
                        }}>
                        <Image
                          style={styles.image}
                          source={{
                            uri: product.product.image,
                          }}
                        />
                        <View style={styles.textContainer}>
                          <Text style={styles.title}>
                            {product.product.title}
                          </Text>
                          <Text style={styles.subtitle}>
                            {product.product.artist_title}
                          </Text>
                          <Text style={styles.title}>{price}</Text>
                        </View>
                        <InputSpinner
                          product={product.product}
                          icon={{size: 20, color: 'black'}}
                          quantity={product.quantity}
                        />
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View style={styles.totalContainer}>
              <Text style={styles.total}>TOTAL</Text>
              <Text style={styles.total}>{totalPrice}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.emptyListText}>
            Não há produtos em seu carrinho ainda!
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productsContainer: {
    padding: 15,
    flex: 1,
  },
  product: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginBottom: 10,
  },
  pageTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 15,
  },
  image: {
    height: 75,
    width: 75,
    marginRight: 5,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'black',
  },
  textContainer: {
    flex: 2,
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
  },
  productsListContainer: {
    flex: 1,
  },
  productsList: {flex: 1},
  contentContainer: {flex: 1},
  totalContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  total: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default ShoppingCart;
