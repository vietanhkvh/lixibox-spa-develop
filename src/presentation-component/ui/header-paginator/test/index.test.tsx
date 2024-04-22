import { reduxRender } from 'utils/test-utils';
import Pagination from '..';

const Component: React.FC<any> = (params = {}) => {
  const props = {};
  return <Pagination {...props} />;
};

describe('HeaderPaginator', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(<Component />, { initialState: {} });
    }).not.toThrow();
  });
});
