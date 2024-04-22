jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductName from '..';

const component = (params = {}) => {
  const props = {
    name: 'Product Name',
    slug: 'product-slug'
  };

  return <ProductName {...Object.assign({}, props, params)} />;
};

describe('ProductName', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
