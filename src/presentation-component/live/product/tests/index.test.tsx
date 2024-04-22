jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LiveProduct from '..';

const component = (params = {}) => {
  const props = {
    productList: [
      {
        id: 111,
        slug: 'product-1',
        image:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/404/large/banner-top.png',
        name: 'Product 1',
        price: 100
      },
      {
        id: 112,
        slug: 'product-2',
        image:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/404/large/banner-top.png',
        name: 'Product 2',
        price: 100
      }
    ],
    isShowFullList: false,
    onAddToCart: jest.fn()
  };

  return <LiveProduct {...Object.assign({}, props, params)} />;
};

describe('LiveProduct', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
