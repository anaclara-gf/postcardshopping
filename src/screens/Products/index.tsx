import React from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useProducts from '../../hooks/useProducts';

function Products(): JSX.Element {
  const {loading, products, imageBaseUrl, pagination} = useProducts();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Postcards</Text>

      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator color={'black'} size="large" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.productsContainer}>
            {products.map(product => (
              <View style={styles.productsList} key={product.id}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${imageBaseUrl}/${product.image_id}/full/843,/0/default.jpg`,
                  }}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.titleText}>{product.title}</Text>
                  <Text style={styles.text}>{product.artist_title}</Text>
                </View>
                <View style={styles.button}>
                  <Button title={'Comprar'} onPress={() => {}} />
                </View>
              </View>
            ))}
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
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productsList: {
    width: '50%',
    padding: 15,
  },
  textContainer: {
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
  image: {
    height: 200,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Products;
