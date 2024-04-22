jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import DiscountCoupon from '..';

const component = (params = {}) => {
  const props = {
    enabled: true,
    coupon: 'LXBCOUPON',
    isApplied: false,
    isApplying: false,
    onClickApply: jest.fn(),
    onClickCoupon: jest.fn()
  } as any;

  return <DiscountCoupon {...Object.assign({}, props, params)} />;
};

describe('DiscountCoupon', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
