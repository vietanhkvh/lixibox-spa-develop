jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductBadgesImage from '..';

const badges = {
  message: null,
  top_left: null,
  top_right: null,
  bottom_right: 'https://example.com/image.png',
  bottom_left: null
};
const component = (params = {}) => {
  const props = {
    badges
  };

  return <ProductBadgesImage {...Object.assign({}, props, params)} />;
};

describe('ProductBadgesImage', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
