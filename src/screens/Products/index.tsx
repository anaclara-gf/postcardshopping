import React from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PropsStack} from '../../../App';
import useProducts from '../../hooks/useProducts';
import Header from '../../components/Header';

function Products(): JSX.Element {
  const {loading, products, imageBaseUrl, pagination} = useProducts();
  const navigation = useNavigation<PropsStack>();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header navigation={navigation} backButton={false} />

      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator color={'black'} size="large" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.productsContainer}>
            {products.map(product => {
              const image = `${imageBaseUrl}/${product.image_id}/full/843,/0/default.jpg`;

              return (
                <Pressable
                  style={styles.productsList}
                  key={product.id}
                  onPress={() => {
                    navigation.navigate('ProductDetail', {
                      product,
                      image,
                    });
                  }}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${imageBaseUrl}/${product.image_id}/full/843,/0/default.jpg`,
                    }}
                  />
                  <View style={styles.productTextContainer}>
                    <Text style={styles.titleText}>{product.title}</Text>
                    <Text style={styles.text}>{product.artist_title}</Text>
                  </View>
                  <View style={styles.button}>
                    <Text style={styles.priceText}>R$15,00</Text>
                    <Button
                      title={'Comprar'}
                      color="black"
                      onPress={() => {}}
                    />
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
  button: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Products;
