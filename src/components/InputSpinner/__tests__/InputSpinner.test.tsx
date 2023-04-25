import {fireEvent} from '@testing-library/react-native';
import InputSpinner from '..';
import {renderWithProviders} from '../../../utils/test-utils';

const product1 = {
  id: 1,
  title: 'Abapuru',
  artist_title: 'Tarsila do Amaral',
  image_id: '6352',
};

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('InputSpinner tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    renderWithProviders(
      <InputSpinner
        product={product1}
        quantity={2}
        icon={{
          size: 20,
          color: 'black',
        }}
      />,
    );
  });

  it('should render minus button when quantity greater than 1', () => {
    const {getByTestId} = renderWithProviders(
      <InputSpinner
        product={product1}
        quantity={2}
        icon={{
          size: 20,
          color: 'black',
        }}
      />,
    );

    expect(getByTestId('minusIconButton')).toBeTruthy;
  });

  it('should render trash button when quantity equals to 1', () => {
    const {getByTestId} = renderWithProviders(
      <InputSpinner
        product={product1}
        quantity={1}
        icon={{
          size: 20,
          color: 'black',
        }}
      />,
    );

    expect(getByTestId('trashIconButton')).toBeTruthy;
  });

  it('should calls addProduct when click on plus button', () => {
    const {getByTestId} = renderWithProviders(
      <InputSpinner
        product={product1}
        quantity={1}
        icon={{
          size: 20,
          color: 'black',
        }}
      />,
    );

    fireEvent.press(getByTestId('plusIconButton'));
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: product1,
      type: 'shoppingCart/addProduct',
    });
  });

  it('should calls removeProduct when click on minus/trash button', () => {
    const {getByTestId} = renderWithProviders(
      <InputSpinner
        product={product1}
        quantity={1}
        icon={{
          size: 20,
          color: 'white',
        }}
      />,
    );

    fireEvent.press(getByTestId('trashIconButton'));
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: product1,
      type: 'shoppingCart/removeProduct',
    });
  });
});
