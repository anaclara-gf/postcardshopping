import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Image, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Props} from '../../../App';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {PropsStack} from '../../../App';
import {Overlay} from '@rneui/base';
import {Pressable} from 'react-native';

export type ProductDetailScreenRouteProp = Props['route'];

function ProductDetail(): JSX.Element {
  const {
    params: {product, image},
  } = useRoute<ProductDetailScreenRouteProp>();

  const navigation = useNavigation<PropsStack>();
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView>
      <Header navigation={navigation} backButton={true} />
      <View style={styles.container}>
        <Pressable onPress={toggleOverlay}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </Pressable>
        <Text>{product.title}</Text>
        <Text>{product.artist_title}</Text>
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Image
          style={styles.fullImage}
          resizeMode="contain"
          source={{
            uri: image,
          }}
        />
      </Overlay>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: 450,
    resizeMode: 'cover',
  },
  fullImage: {
    width: '100%',
    objectFit: 'contain',
    height: 'auto',
    aspectRatio: 1,
  },
});

export default ProductDetail;
