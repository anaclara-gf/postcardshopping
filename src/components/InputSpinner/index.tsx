import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch} from '../../store/hooks';
import {
  addProduct,
  removeProduct,
} from '../../store/shoppingCart/shoppingCartSlice';
import {Product} from '../../utils/types/Product';

interface Props {
  product: Product;
  icon: {
    size: number;
    color: string;
  };
  quantity: number;
}

function InputSpinner({product, icon, quantity}: Props) {
  const dispatch = useAppDispatch();
  const styles = styling(icon.color);
  return (
    <View style={styles.quantityContainer}>
      <Pressable
        style={styles.iconContainer}
        onPress={() => dispatch(removeProduct(product))}>
        {quantity > 1 ? (
          <Icon
            testID="minusIconButton"
            name="minus"
            size={icon.size}
            color={icon.color}
          />
        ) : (
          <Icon
            testID="trashIconButton"
            name="trash"
            size={icon.size}
            color={icon.color}
          />
        )}
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.numberText}>{quantity}</Text>
      </View>
      <Pressable
        style={styles.iconContainer}
        onPress={() => dispatch(addProduct(product))}>
        <Icon
          testID="plusIconButton"
          name="plus"
          size={icon.size}
          color={icon.color}
        />
      </Pressable>
    </View>
  );
}

const styling = (color: string) =>
  StyleSheet.create({
    quantityContainer:
      color === 'black'
        ? {
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
          }
        : {
            height: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
    numberText:
      color === 'black'
        ? {
            color: 'black',
            fontWeight: 'bold',
            fontSize: 26,
            marginHorizontal: 15,
          }
        : {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 18,
          },

    textContainer:
      color === 'black'
        ? {
            flex: 1,
            alignItems: 'center',
          }
        : {
            backgroundColor: 'black',
            height: 40,
            width: 80,
            marginHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },

    iconContainer:
      color === 'black'
        ? {}
        : {
            backgroundColor: 'black',
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          },
  });

export default InputSpinner;
