import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable, FlatList} from 'react-native';
import Header from '../../components/Header';
import {useAppSelector} from '../../store/hooks';
import DeleteDialog from '../../components/Dialog';
import ProductTileHorizontal from '../../components/ProductTileHorizontal';

function ShoppingCart(): JSX.Element {
  const [dialog, setDialog] = useState<boolean>(false);

  const products = useAppSelector(state => state.shoppingCart.products);
  const totalProducts = products.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = `R$${15 * totalProducts},00`;

  const toggleDialog = () => {
    setDialog(!dialog);
  };

  return (
    <View style={styles.container}>
      <Header
        backButton={false}
        closeButton={true}
        shoppingCartButton={false}
      />
      <View style={styles.productsContainer}>
        <Text style={styles.pageTitle}>
          Seu carrinho - {products.length} item(s)
        </Text>

        {products.length ? (
          <>
            <Pressable onPress={toggleDialog} style={styles.cleanCartButton}>
              <Text style={styles.cleanCartText}>Limpar carrinho</Text>
            </Pressable>
            <View style={styles.contentContainer}>
              <FlatList
                initialNumToRender={10}
                style={styles.productsList}
                data={products}
                renderItem={({item}) => (
                  <ProductTileHorizontal key={item.product.id} product={item} />
                )}
              />
              <View style={styles.totalContainer}>
                <Text style={styles.total}>TOTAL</Text>
                <Text style={styles.total}>{totalPrice}</Text>
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.emptyListText}>
            Não há produtos em seu carrinho ainda!
          </Text>
        )}
      </View>
      <DeleteDialog toggleDialog={toggleDialog} dialog={dialog} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productsContainer: {
    padding: 15,
    flex: 1,
  },
  pageTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 15,
  },
  cleanCartButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  cleanCartText: {
    color: 'red',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
  },
  productsList: {flex: 1},
  contentContainer: {flex: 1},
  totalContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  total: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default ShoppingCart;
