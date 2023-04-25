import {fireEvent} from '@testing-library/react-native';
import {renderWithProviders} from '../../../utils/test-utils';
import React from 'react';
import ShoppingCart from '..';

const product1 = {
  id: 1,
  title: 'Abapuru',
  artist_title: 'Tarsila do Amaral',
  image_id: '6352',
};

const mockedStoreState = {
  shoppingCart: {
    products: [
      {
        product: {
          id: 1,
          title: 'Abapuru',
          artist_title: 'Tarsila do Amaral',
          image_id: '6352',
        },
        quantity: 1,
      },
    ],
  },
};

const mockedEmptyStoreState = {
  shoppingCart: {
    products: [],
  },
};

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('ShoppingCart tests', () => {
  it('should render correctly', () => {
    renderWithProviders(<ShoppingCart />, {
      preloadedState: mockedStoreState,
    });
  });

  it('should call navigate to "ProductDetail" when pressing tile', () => {
    const {getByTestId} = renderWithProviders(<ShoppingCart />, {
      preloadedState: mockedStoreState,
    });

    fireEvent.press(getByTestId('productTileTestId'));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('ProductDetail', {
      product: product1,
    });
  });

  it('should render empty cart message if cart is empty', () => {
    const {getByText} = renderWithProviders(<ShoppingCart />, {
      preloadedState: mockedEmptyStoreState,
    });

    expect(getByText('Não há produtos em seu carrinho ainda!')).toBeTruthy();
  });
});
