import {fireEvent} from '@testing-library/react-native';
import {renderWithProviders} from '../../../utils/tests/test-utils';
import ProductDetail from '..';
import React from 'react';

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

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => {},
    useRoute: jest
      .fn()
      .mockReturnValueOnce({
        params: {
          product: product1,
        },
      })
      .mockReturnValue({
        params: {
          product: product2,
        },
      }),
  };
});

jest.mock('@rneui/base', () => ({
  Overlay: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('ProductDetail tests', () => {
  it('should render correctly', () => {
    renderWithProviders(<ProductDetail />, {
      preloadedState: mockedStoreState,
    });
  });

  it('should show button Comprar when there is no product on shoppingCart', () => {
    const {getByText} = renderWithProviders(<ProductDetail />, {
      preloadedState: mockedStoreState,
    });

    expect(getByText('Comprar')).toBeTruthy();
  });

  it('should call addProduct when click on Comprar button', () => {
    const {getByText} = renderWithProviders(<ProductDetail />, {
      preloadedState: mockedStoreState,
    });

    fireEvent.press(getByText('Comprar'));
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: product2,
      type: 'shoppingCart/addProduct',
    });
  });

  it('should toggle overlay image visibility when click on image', () => {
    const {getByTestId} = renderWithProviders(<ProductDetail />, {
      preloadedState: mockedStoreState,
    });

    fireEvent.press(getByTestId('imageTestId'));
  });
});
