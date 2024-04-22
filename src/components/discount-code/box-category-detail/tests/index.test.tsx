jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { INITIAL_STATE_DISCOUNT_CODE } from '../../../../flows/discount-code/reducer';
import DiscountCodeBoxCategoryDetail, { BOX_CATEGORY } from '../component';

const component = (params = {}) => {
  const props = {
    code: 'LXBCODE',
    boxCategory: BOX_CATEGORY.GiftBoxes,
    perPage: 5,
    discountCodeStore: INITIAL_STATE_DISCOUNT_CODE,
    fetchDiscountCodesByCodeAction: jest.fn(),
    fetchDiscountCodeSpecialAddonsAction: jest.fn(),
    fetchDiscountCodeApplicableBoxesAction: jest.fn(),
    fetchDiscountCodeGiftBoxesAction: jest.fn()
  };

  return <DiscountCodeBoxCategoryDetail {...Object.assign({}, props, params)} />;
};

describe('DiscountCodeBoxCategoryDetail', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
