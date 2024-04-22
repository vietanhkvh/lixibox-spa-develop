jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../flows/cart/reducer';
import { INITIAL_STATE_DISCOUNT_CODE } from '../../../../flows/discount-code/reducer';
import DiscountCodeDetail from '../component';

const component = (params = {}) => {
  const props = {
    code: 'LXBCODE',
    standalone: false,
    cartStore: INITIAL_STATE_CART,
    discountCodeStore: INITIAL_STATE_DISCOUNT_CODE,
    fetchDiscountCodesByCodeAction: jest.fn(),
    addDiscountCodeAction: jest.fn(),
    copyTextToClipboard: jest.fn()
  };

  return <DiscountCodeDetail {...Object.assign({}, props, params)} />;
};

describe('DiscountCodeDetail', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
