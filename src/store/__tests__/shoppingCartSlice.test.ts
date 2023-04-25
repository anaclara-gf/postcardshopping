import {store} from '..';
import {addProduct, removeProduct} from '../shoppingCart/shoppingCartSlice';

const product1 = {
  id: 1,
  title: 'Abapuru',
  artist_title: 'Tarsila do Amaral',
  image_id: '6352',
};

const product2 = {
  id: 2,
  title: 'Monalisa',
  artist_title: 'Leonardo da Vinci',
  image_id: '2548',
};

describe('Shopping Cart redux state tests', () => {
  it('should initialy set products to en empty array', () => {
    const state = store.getState().shoppingCart;
    expect(state.products).toEqual([]);
  });

  it('should load products list with payload', () => {
    store.dispatch(addProduct(product1));

    const state = store.getState().shoppingCart;
    expect(state.products).toHaveLength(1);
  });

  it('should increase quantity when load product already in the list', () => {
    store.dispatch(addProduct(product1));

    const state = store.getState().shoppingCart;
    expect(state.products[0].quantity).toEqual(2);
  });

  it('should decrease quantity when remove product with quantity > 1', () => {
    store.dispatch(removeProduct(product1));

    const state = store.getState().shoppingCart;
    expect(state.products[0].quantity).toEqual(1);
  });

  it('should add two items when load two different products', () => {
    store.dispatch(addProduct(product2));

    const state = store.getState().shoppingCart;
    expect(state.products).toHaveLength(2);
  });

  it('should remove product from the list when remove product with quantity = 1', () => {
    store.dispatch(removeProduct(product2));

    const state = store.getState().shoppingCart;
    expect(state.products).toHaveLength(1);
  });

  it('should happen nothing when trying to remove product that is not in the list', () => {
    store.dispatch(removeProduct(product2));

    const state = store.getState().shoppingCart;
    expect(state.products).toHaveLength(1);
  });
});
