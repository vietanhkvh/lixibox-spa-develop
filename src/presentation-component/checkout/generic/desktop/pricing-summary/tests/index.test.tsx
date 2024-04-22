jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { INITIAL_STATE_CART } from '../../../../../../flows/cart/reducer';
import { reduxRender } from '../../../../../../utils/test-utils';
import PricingSummary from '..';

const component = (params = {}) => {
  const props = {
    cartDetail: INITIAL_STATE_CART.cartDetail,
    cartView: true,
    cartCheckout: false
  };

  return <PricingSummary {...Object.assign({}, props, params)} />;
};

describe('PricingSummary', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
