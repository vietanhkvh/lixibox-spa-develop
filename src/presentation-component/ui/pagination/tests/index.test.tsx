jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Pagination from '..';

const component = (params = {}) => {
  const props = {
    currentPage: 1,
    perPage: 10,
    totalPages: 30,
    pageableUrl: '/test',
    onPageClick: jest.fn()
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
