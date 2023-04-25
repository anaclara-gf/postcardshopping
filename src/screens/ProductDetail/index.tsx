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
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable testID="imageTestId" onPress={toggleOverlay}>
          <Image
            style={styles.image}
            source={{
              uri: product.image,
            }}
          />
        </Pressable>
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.subtitle}>{product.artist_title}</Text>
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
      </ScrollView>
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
  image: {
    height: 450,
  },
  detailsContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
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
