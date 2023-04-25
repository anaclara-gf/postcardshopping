import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useProducts from '../../hooks/useProducts';
import Header from '../../components/Header';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {addProduct} from '../../store/shoppingCart/shoppingCartSlice';
import InputSpinner from '../../components/InputSpinner';
import { PropsStack } from '../../router';

function Products(): JSX.Element {
  const {loading, products, error, fetchProducts, pagination} = useProducts();
  const navigation = useNavigation<PropsStack>();
  const dispatch = useAppDispatch();

  const shoppingCartProducts = useAppSelector(
    state => state.shoppingCart.products,
  );
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        backButton={false}
        closeButton={false}
        shoppingCartButton={true}
      />

      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator color={'black'} size="large" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Ops! Tivemos um erro enquanto tentávamos carregar os produtos
          </Text>
          <Pressable onPress={fetchProducts} style={styles.tryAgainButton}>
            <Text style={styles.tryAgainButtonText}>Tentar Novamente</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.productsContainer}>
            {products.map(product => {
              const productQuantity = shoppingCartProducts.filter(
                item => item.product.id === product.id,
              );
              return (
                <Pressable
                  style={styles.productsList}
                  key={product.id}
                  onPress={() => {
                    navigation.navigate('ProductDetail', {
                      product,
                    });
                  }}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: product.image,
                    }}
                  />
                  <View style={styles.productTextContainer}>
                    <Text style={styles.titleText}>{product.title}</Text>
                    <Text style={styles.text}>{product.artist_title}</Text>
                  </View>
                  <View style={styles.shoppingContainer}>
                    <Text style={styles.priceText}>R$15,00</Text>
                    <View>
                      {productQuantity.length ? (
                        <InputSpinner
                          product={product}
                          icon={{size: 25, color: 'white'}}
                          quantity={productQuantity[0].quantity}
                        />
                      ) : (
                        <Pressable
                          style={styles.button}
                          onPress={() => dispatch(addProduct(product))}>
                          <Text style={styles.buttonText}>Comprar</Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    transform: [{scaleX: 2}, {scaleY: 2}],
  },
  errorContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 26,
    color: 'black',
    textAlign: 'center',
  },
  tryAgainButton: {
    marginTop: 20,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tryAgainButtonText: {
    fontSize: 22,
    color: 'white',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productsList: {
    width: '50%',
    padding: 15,
  },
  productTextContainer: {
    marginBottom: 8,
  },
  titleText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    fontStyle: 'italic',
    color: 'black',
  },
  priceText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
  },
  image: {
    height: 200,
  },
  shoppingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: 'black',
    height: 40,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Products;
