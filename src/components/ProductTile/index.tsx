import {Pressable, StyleSheet, Image, View, Text} from 'react-native';
import {Product} from '../../types/Product';
import {useNavigation} from '@react-navigation/native';
import {PropsStack} from '../../router';
import InputSpinner from '../InputSpinner';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {addProduct} from '../../store/shoppingCart/shoppingCartSlice';

interface Props {
  product: Product;
}

function ProductTile({product}: Props): JSX.Element {
  const navigation = useNavigation<PropsStack>();
  const dispatch = useAppDispatch();

  const shoppingCartProducts = useAppSelector(
    state => state.shoppingCart.products,
  );

  const productQuantity = shoppingCartProducts.filter(
    item => item.product.id === product.id,
  );

  return (
    <Pressable
      testID="productTileTestId"
      style={styles.productTileContainer}
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
}

const styles = StyleSheet.create({
  productTileContainer: {
    width: '50%',
    padding: 15,
  },
  image: {
    height: 200,
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
  shoppingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  priceText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
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

export default ProductTile;
