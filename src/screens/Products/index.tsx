import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
} from 'react-native';
import useProducts from '../../hooks/useProducts';
import Header from '../../components/Header';
import ProductTile from '../../components/ProductTile';

function Products(): JSX.Element {
  const {loading, products, error, fetchProducts} = useProducts();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        backButton={false}
        closeButton={false}
        shoppingCartButton={true}
      />

      {loading ? (
        <View testID="loadingTestId" style={styles.container}>
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
        <FlatList
          initialNumToRender={10}
          numColumns={2}
          style={styles.productsContainer}
          data={products}
          renderItem={({item}) => <ProductTile key={item.id} product={item} />}
        />
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
    flex: 1,
  },
});

export default Products;
