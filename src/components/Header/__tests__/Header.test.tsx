import React from 'react';
import Header from '..';
import {renderWithProviders} from '../../../utils/tests/test-utils';
import {fireEvent} from '@testing-library/react-native';

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

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
    }),
  };
});

describe('Header tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    renderWithProviders(
      <Header
        backButton={true}
        closeButton={false}
        shoppingCartButton={true}
      />,
    );
  });

  it('should always render page title', () => {
    const {getByText} = renderWithProviders(
      <Header
        backButton={true}
        closeButton={false}
        shoppingCartButton={true}
      />,
    );

    expect(getByText('Postcards')).toBeTruthy;
  });

  it('should render back button and shopping cart button if props says so', () => {
    const {getByTestId} = renderWithProviders(
      <Header
        backButton={true}
        closeButton={false}
        shoppingCartButton={true}
      />,
    );

    expect(getByTestId('arrowLeftIconButton')).toBeTruthy;
    expect(getByTestId('shoppingCartIconButton')).toBeTruthy;
  });

  it('should render close button if props says so', () => {
    const {getByTestId} = renderWithProviders(
      <Header
        backButton={false}
        closeButton={true}
        shoppingCartButton={false}
      />,
    );

    expect(getByTestId('closeIconButton')).toBeTruthy;
  });

  it('should show quantity of products next to shoppingCart', () => {
    const {getByTestId} = renderWithProviders(
      <Header
        backButton={true}
        closeButton={false}
        shoppingCartButton={true}
      />,
      {preloadedState: mockedStoreState},
    );

    expect(getByTestId('quantityOfProductsText')).toBeTruthy;
  });

  it('should calls goBack when pressing left arrow button', () => {
    const {getByTestId} = renderWithProviders(
      <Header
        backButton={true}
        closeButton={false}
        shoppingCartButton={true}
      />,
    );

    fireEvent.press(getByTestId('arrowLeftIconButton'));
    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });

  it('should calls goBack when pressing close button', () => {
    const {getByTestId} = renderWithProviders(
      <Header
        backButton={false}
        closeButton={true}
        shoppingCartButton={false}
      />,
    );

    fireEvent.press(getByTestId('closeIconButton'));
    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });

  it('should calls navigate to "ShoppingCart" when pressing shopping cart button', () => {
    const {getByTestId} = renderWithProviders(
      <Header
        backButton={true}
        closeButton={false}
        shoppingCartButton={true}
      />,
    );

    fireEvent.press(getByTestId('shoppingCartIconButton'));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('ShoppingCart');
  });
});
