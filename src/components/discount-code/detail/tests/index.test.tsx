jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { INITIAL_STATE_DISCOUNT_CODE } from '../../../../flows/discount-code/reducer';
import DiscountCodeDetail from '../component';

const component = (params = {}) => {
  const props = {
    code: 'LXBCODE',
    isCompact: true,
    perPage: 5,
    discountCodeStore: INITIAL_STATE_DISCOUNT_CODE,
    fetchDiscountCodesByCodeAction: jest.fn(),
    fetchDiscountCodeSpecialAddonsAction: jest.fn(),
    fetchDiscountCodeApplicableBoxesAction: jest.fn(),
    fetchDiscountCodeGiftBoxesAction: jest.fn()
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
