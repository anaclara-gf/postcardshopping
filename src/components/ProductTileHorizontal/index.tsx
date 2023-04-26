import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import InputSpinner from '../InputSpinner';
import {Product} from '../../utils/types/Product';
import {useNavigation} from '@react-navigation/native';
import {PropsStack} from '../../router';

interface Props {
  product: {product: Product; quantity: number};
}

function ProductTileHorizontal({product}: Props): JSX.Element {
  const navigation = useNavigation<PropsStack>();
  const price = `R$${15 * product.quantity},00`;
  return (
    <View key={product.product.id}>
      <Pressable
        key={product.product.id}
        testID="productTileTestId"
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
          <Text style={styles.title}>{product.product.title}</Text>
          <Text style={styles.subtitle}>{product.product.artist_title}</Text>
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
}

const styles = StyleSheet.create({
  product: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginBottom: 10,
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
  image: {
    height: 75,
    width: 75,
    marginRight: 5,
  },
});

export default ProductTileHorizontal;
