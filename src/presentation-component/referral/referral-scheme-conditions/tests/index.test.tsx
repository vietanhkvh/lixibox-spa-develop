jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ReferralSchemeConditions from '..';

const conditions = [
  { name: 'Tài khoản lần đầu tiên mua hàng', satisfied: true },
  { name: 'Thiết bị lần đầu tiên mua hàng', satisfied: true },
  { name: 'Đơn hàng giá trị trên 400.000đ', satisfied: false },
  { name: 'Mua ít nhất 1 sản phầm Halio', satisfied: false }
];

const component = (params = {}) => {
  const props = {
    conditions
  } as any;

  return <ReferralSchemeConditions {...Object.assign({}, props, params)} />;
};

describe('ReferralSchemeConditions', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
