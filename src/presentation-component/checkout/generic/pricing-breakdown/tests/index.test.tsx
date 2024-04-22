jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { INITIAL_STATE_CART } from '../../../../../flows/cart/reducer';
import { reduxRender } from '../../../../../utils/test-utils';
import PricingBreakdown from '..';

const component = (params = {}) => {
  const props = {
    cartDetail: INITIAL_STATE_CART.cartDetail,
    cartView: true
  };

  return <PricingBreakdown {...Object.assign({}, props, params)} />;
};

describe('PricingBreakdown', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
