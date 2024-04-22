import { withRouter } from 'react-router';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../../flows/cart/reducer';
import PickupStoreSelector from '../component';

const component = (params = {}) => {
  const props = {
    onSelect: jest.fn(),
    cartStore: INITIAL_STATE_CART,
    checkoutAddressAction: jest.fn,
    deliverySetDeliveryMethod: jest.fn,
    deliveryUserPickupStoreAddressAction: jest.fn
  };

  return withRouter<any, any>(<PickupStoreSelector {...Object.assign({}, props, params)} />);
};

describe('PickupStoreSelector', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
