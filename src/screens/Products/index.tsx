import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import useProducts from '../../hooks/useProducts';
import Header from '../../components/Header';
import ProductTile from '../../components/ProductTile';

function Products(): JSX.Element {
  const {loading, products, error, fetchProducts, pagination} = useProducts();
  
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
            {products.map(product => (
                <ProductTile key={product.id} product={product} />
              )
            )}
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
});

export default Products;
