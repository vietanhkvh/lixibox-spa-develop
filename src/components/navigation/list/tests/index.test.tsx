jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import NavigationList from '../container';

const listAboutNavigation = [
  {
    icon: 'angle-right',
    title: 'Giới thiệu',
    mobile: {
      title: 'Giới thiệu',
      description: 'Giới thiệu'
    },
    color: '#ffffff',
    link: '/about-us',
    iconStyle: { width: 8 },
    renderView: () => <div>View1</div>
  },
  {
    icon: 'angle-right',
    title: 'Điều khoản và Quy định',
    mobile: {
      title: 'Điều khoản và Quy định',
      description: 'Điều khoản và Quy định'
    },
    color: '#ffffff',
    link: '/link1',
    iconStyle: { width: 8 },
    renderView: () => <div>View2</div>
  },
  {
    icon: 'angle-right',
    title: 'Chính sách Bảo mật',
    mobile: {
      title: 'Chính sách Bảo mật',
      description: 'Chính sách Bảo mật'
    },
    color: '#ffffff',
    link: '/link2',
    iconStyle: { width: 8 },
    renderView: ''
  }
];
const component = (params = {}) => {
  const props = {
    list: listAboutNavigation,
    signOut: jest.fn(),
    clearCart: jest.fn()
  };

  return <NavigationList {...Object.assign({}, props, params)} />;
};

describe('NavigationList', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
