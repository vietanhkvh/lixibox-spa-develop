jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import ProductSliderWithHeading from '..';

const component = (params = {}) => {
  const props = {
    title: '',
    viewMoreTitle: 'Xem tất cả',
    viewMoreLink: '#',
    isShowViewMore: false,
    column: 5
  };

  return <ProductSliderWithHeading {...Object.assign({}, props, params)} />;
};

describe('ProductSliderWithHeading', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
