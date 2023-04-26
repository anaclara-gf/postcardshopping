import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import {renderWithProviders} from '../../../utils/tests/test-utils';
import React from 'react';
import axios from 'axios';
import Products from '..';
import {act} from 'react-test-renderer';

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

const products = [
  {
    artist_display: 'Édouard Manet French, 1832-1883',
    artist_title: 'Édouard Manet',
    artwork_type_title: 'Drawing and Watercolor',
    date_display: 'c. 1882',
    dimensions: '55 × 35 cm (21 11/16 × 13 13/16 in.)',
    id: 191566,
    image:
      'https://www.artic.edu/iiif/2/69ec8cb3-fe27-8cf1-28f8-69b933ce6a70/full/843,/0/default.jpg',
    image_id: '69ec8cb3-fe27-8cf1-28f8-69b933ce6a70',
    medium_display:
      'Pastel on canvas, prepared with an off-white gouache ground',
    place_of_origin: 'France',
    style_title: null,
    title: 'The Man with the Dog',
  },
  {
    artist_display: 'Albert AndréFrench, 1869-1954',
    artist_title: 'Albert André',
    artwork_type_title: 'Painting',
    date_display: '1893',
    dimensions: '48.6 × 65.2 cm (19 1/8 × 25 11/16 in.)',
    id: 16464,
    image:
      'https://www.artic.edu/iiif/2/8815edcf-6c26-6ebb-32c7-f2a440ce7028/full/843,/0/default.jpg',
    image_id: '8815edcf-6c26-6ebb-32c7-f2a440ce7028',
    medium_display: 'Oil on panel',
    place_of_origin: 'France',
    style_title: '19th century',
    title: 'Place des Batignolles, Paris',
  },
];

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ShoppingCart tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', async () => {
    const promise = Promise.resolve({
      status: 200,
      data: {data: products, config: {iiif_url: ''}},
    });
    mockedAxios.get.mockImplementationOnce(() => promise);

    renderWithProviders(<Products />);

    await waitForElementToBeRemoved(() => screen.getByTestId('loadingTestId'));
  });

  it('should render error', async () => {
    const promise = Promise.reject();
    mockedAxios.get.mockImplementationOnce(() => promise);

    renderWithProviders(<Products />);
    await waitForElementToBeRemoved(() => screen.getByTestId('loadingTestId'));
    await waitFor(() => {
      expect(
        screen.getByText(
          'Ops! Tivemos um erro enquanto tentávamos carregar os produtos',
        ),
      ).toBeTruthy();
    });
  });
});
