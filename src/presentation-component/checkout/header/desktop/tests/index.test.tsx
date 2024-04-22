jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { INITIAL_STATE_APP } from '../../../../../flows/app/reducer';
import { INITIAL_STATE_CART } from '../../../../../flows/cart/reducer';
import { reduxRender } from '../../../../../utils/test-utils';
import { CHECKOUT_PHASES } from '../../../../../constants/application/checkout';
import CheckoutHeader from '..';

const component = (params = {}) => {
  const props = {
    phases: CHECKOUT_PHASES,
    currentPhase: CHECKOUT_PHASES[0],
    pathname: '/',
    cartStore: INITIAL_STATE_CART,
    appStore: INITIAL_STATE_APP
  };

  return <CheckoutHeader {...Object.assign({}, props, params)} />;
};

describe('CheckoutHeader', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
