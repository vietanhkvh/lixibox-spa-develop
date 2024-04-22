import { withRouter } from 'react-router';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { INITIAL_STATE_ADDRESS } from '../../../../../../flows/address/reducer';
import { INITIAL_STATE_CART } from '../../../../../../flows/cart/reducer';
import { reduxRender } from '../../../../../../utils/test-utils';
import UserAddressSelector from '../component';

const component = (params = {}) => {
  const props = {
    onSelect: jest.fn(),
    addressStore: INITIAL_STATE_ADDRESS,
    cartStore: INITIAL_STATE_CART,
    addUserAddressAction: jest.fn(),
    checkoutAction: jest.fn(),
    checkoutAddressAction: jest.fn(),
    checkSameDayShippingAction: jest.fn(),
    deleteUserAddressAction: jest.fn(),
    deliveryChooseAddressAction: jest.fn(),
    editUserAddressAction: jest.fn(),
    setPrimaryAddressAction: jest.fn(),
    openAlertAction: jest.fn()
  };

  return withRouter<any, any>(<UserAddressSelector {...Object.assign({}, props, params)} />);
};

describe('UserAddressSelector', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
