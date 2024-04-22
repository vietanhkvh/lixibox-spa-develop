import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductSizeGuide from '..';

const component = (params = {}) => {
  const props = {
    image: 'https://example.com/img1.png',
    closeModal: jest.fn()
  };

  return withRouter((routerProps) => <ProductSizeGuide {...Object.assign({}, props, routerProps, params)} />);
};

describe('ProductSizeGuide', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
