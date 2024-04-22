jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductCategoryCover from '..';

const component = (params = {}) => {
  const props = {
    categorySlug: 'a-category'
  };

  return <ProductCategoryCover {...Object.assign({}, props, params)} />;
};

describe('ProductCategoryCover', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
