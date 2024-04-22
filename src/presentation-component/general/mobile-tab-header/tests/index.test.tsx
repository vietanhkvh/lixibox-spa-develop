jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
window.HTMLElement.prototype.scrollIntoView = jest.fn();
import { reduxRender } from '../../../../utils/test-utils';
import MobileTabHeader from '..';

const component = (params = {}) => {
  const props = {
    tabs: [
      {
        id: -1,
        code: 'all',
        title: 'Tất cả',
        link: '/0'
      },
      {
        id: 1,
        code: 'test1',
        title: 'Test 1',
        link: '/1',
        selected: true
      },
      {
        id: 2,
        code: 'test2',
        title: 'Test 2',
        link: '/2'
      }
    ],
    onSelect: jest.fn(),
    isEqually: true,
    isBorderStyle: false
  };

  return <MobileTabHeader {...Object.assign({}, props, params)} />;
};

describe('MobileTabHeader', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
