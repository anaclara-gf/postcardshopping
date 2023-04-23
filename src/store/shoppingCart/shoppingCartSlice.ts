import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../types/Product';
import {RootState} from '..';

interface ShoppingCartProduct {
  product: Product;
  quantity: number;
}

interface ShoppingCartState {
  products: ShoppingCartProduct[];
}

const initialState: ShoppingCartState = {
  products: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find(
        product => action.payload.id === product.product.id,
      );

      existingProduct
        ? (existingProduct.quantity += 1)
        : state.products.push({product: action.payload, quantity: 1});
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      const product = state.products.find(
        product => action.payload.id === product.product.id,
      );

      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          const index = state.products.indexOf(product);
          state.products.splice(index, 1); 
        }
      }
    },
  },
});

export const {addProduct, removeProduct} = shoppingCartSlice.actions;

export const selectProducts = (state: RootState) => state.shoppingCart.products;

export default shoppingCartSlice.reducer;
