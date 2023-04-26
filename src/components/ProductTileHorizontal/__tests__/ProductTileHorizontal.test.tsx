import {fireEvent} from '@testing-library/react-native';
import {renderWithProviders} from '../../../utils/tests/test-utils';
import React from 'react';
import ProductTileHorizontal from '..';

const product1 = {
  id: 1,
  title: 'Abapuru',
  artist_title: 'Tarsila do Amaral',
  image_id: '6352',
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

describe('ProductTilHorizontal tests', () => {
  it('should render correctly', () => {
    renderWithProviders(
      <ProductTileHorizontal product={{product: product1, quantity: 2}} />,
    );
  });

  it('should call navigate to "ProductDetail" when pressing tile', () => {
    const {getByTestId} = renderWithProviders(
      <ProductTileHorizontal product={{product: product1, quantity: 2}} />,
    );

    fireEvent.press(getByTestId('productTileTestId'));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('ProductDetail', {
      product: product1,
    });
  });
});
