jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Pagination from '..';

const component = (params = {}) => {
  const props = {
    current: 1,
    per: 10,
    total: 30,
    urlList: [
      { number: 1, title: 'Title 1', link: '#' },
      { number: 2, title: 'Title 2', link: '#' }
    ],
    handleClick: jest.fn(),
    canScrollToTop: true
  };

  return <Pagination {...Object.assign({}, props, params)} />;
};

describe('Pagination', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
