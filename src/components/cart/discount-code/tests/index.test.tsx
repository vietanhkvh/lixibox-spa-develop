jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import DiscountCodeBlock from '../component';
import { INITIAL_STATE_AUTH } from '../../../../flows/auth/reducer';
import { INITIAL_STATE_CART } from '../../../../flows/cart/reducer';

const component = (params = {}) => {
  const props = {
    removeDiscountCodeAction: jest.fn(),
    authStore: INITIAL_STATE_AUTH,
    cartStore: INITIAL_STATE_CART,
    fetchUserPersonalDiscountCodesAction: jest.fn(),
    fetchUserVouchersAction: jest.fn()
  };

  return <DiscountCodeBlock {...Object.assign({}, props, params)} />;
};

describe('DiscountCodeBlock', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
