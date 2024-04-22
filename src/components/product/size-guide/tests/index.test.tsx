import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductSizeGuide from '..';

const sizeGuides = [
  { title: 'Size 1', image_url: 'https://example.com/img1.png' },
  { title: 'Size 2', image_url: 'https://example.com/img2.png' },
  { title: 'Size 3', image_url: 'https://example.com/img3.png' }
];
const component = (params = {}) => {
  const props = {
    list: sizeGuides,
    onClick: jest.fn()
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
