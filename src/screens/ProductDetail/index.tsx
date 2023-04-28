import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Overlay} from '@rneui/base';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {addProduct} from '../../store/shoppingCart/shoppingCartSlice';
import Header from '../../components/Header';
import InputSpinner from '../../components/InputSpinner';
import {Props} from '../../router';

export type ProductDetailScreenRouteProp = Props['route'];

function ProductDetail(): JSX.Element {
  const {
    params: {product},
  } = useRoute<ProductDetailScreenRouteProp>();

  const dispatch = useAppDispatch();

  const shoppingCartProducts = useAppSelector(
    state => state.shoppingCart.products,
  );

  const productQuantity = shoppingCartProducts.filter(
    item => item.product.id === product.id,
  );

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Header backButton={true} closeButton={false} shoppingCartButton={true} />
      <View style={styles.container}>
        <Pressable
          style={styles.imageContainer}
          testID="imageTestId"
          onPress={toggleOverlay}>
          <Image
            style={styles.image}
            source={{
              uri: product.image,
            }}
          />
        </Pressable>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.subtitle}>{product.artist_title}</Text>
          </View>
          <View>
            <Text style={styles.details}>A6 (10,5 x 14,8 cm),</Text>
            <Text style={styles.details}>
              couché 300g (acabamento brilhante)
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>R$15,00</Text>
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
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Image
          testID="overlayImageTestId"
          style={styles.fullImage}
          resizeMode="contain"
          source={{
            uri: product.image,
          }}
        />
      </Overlay>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  imageContainer: {
    height: '60%',
  },
  image: {
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  title: {
    marginTop: 10,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'black',
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  details: {
    color: 'black',
    fontSize: 14,
  },
  priceContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'black',
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  fullImage: {
    width: '100%',
    objectFit: 'contain',
    height: 'auto',
    aspectRatio: 1,
  },
});

export default ProductDetail;
