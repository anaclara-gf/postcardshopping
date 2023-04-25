import {fireEvent} from '@testing-library/react-native';
import ProductTile from '..';
import {renderWithProviders} from '../../../utils/test-utils';
import { store } from '../../../store';
import { removeProduct } from '../../../store/shoppingCart/shoppingCartSlice';

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

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('ProductTile tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    renderWithProviders(<ProductTile product={product1} />, {
      preloadedState: mockedStoreState,
    });
  });

  it('should should call navigate to "ProductDetail" when pressing tile', () => {
    const {getByTestId} = renderWithProviders(
      <ProductTile product={product1} />,
      {
        preloadedState: mockedStoreState,
      },
    );

    fireEvent.press(getByTestId('productTileTestId'));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('ProductDetail', {
      product: product1,
    });
  });

  it('should should show button Comprar when there is no product on shoppingCart', () => {
    const {getByText} = renderWithProviders(
      <ProductTile product={product2} />,
      {
        preloadedState: mockedStoreState,
      },
    );

    expect(getByText('Comprar')).toBeTruthy();
  });

  it('should call addProduct when click on Comprar button', () => {
    const {getByText} = renderWithProviders(
      <ProductTile product={product2} />,
      {
        preloadedState: mockedStoreState,
      },
    );

    fireEvent.press(getByText('Comprar'));
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: product2,
      type: 'shoppingCart/addProduct',
    });
  });
});
