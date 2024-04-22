import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import { ReferralSchemeTabs } from '../../../constant';
import View from '..';

const activeSchemes = [
  {
    code: 'DUYENF8A91',
    balance: 200000,
    lixicoin: 300,
    title: 'Nhận ngay ưu đãi khi giới thiệu bạn bè mua đơn hàng từ 400.000 đ',
    note: 'Thời gian: Từ 01/12/2018 đến 15/03/2022',
    expired: false
  },
  {
    code: 'DUYENF8A91',
    balance: 300000,
    lixicoin: 400,
    title: 'Nhận ngay ưu đãi khi giới thiệu bạn bè mua đơn hàng từ 400.000 đ',
    note: 'Thời gian: Từ 01/12/2018 đến 15/03/2022',
    expired: false
  },
  {
    code: 'DUYENF8A91',
    balance: 400000,
    lixicoin: 500,
    title: 'Nhận ngay ưu đãi khi giới thiệu bạn bè mua đơn hàng từ 400.000 đ',
    note: 'Thời gian: Từ 01/12/2018 đến 15/03/2022',
    expired: false
  }
];

const component = (params = {}) => {
  const props = {
    code: 'CODEABCDE',
    schemes: activeSchemes,
    tabs: ReferralSchemeTabs,
    onTabSelect: jest.fn()
  } as any;

  return withRouter((routerProps) => <View {...Object.assign({}, props, routerProps, params)} />);
};

describe('View', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
