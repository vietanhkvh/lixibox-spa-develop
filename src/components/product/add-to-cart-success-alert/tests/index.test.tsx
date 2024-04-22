import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductAddToCartSuccessAlert from '..';

const component = (params = {}) => {
  const props = {
    data: {
      data: {
        product: {
          image: 'https://example.com/image.png',
          price: 55,
          name: 'Test Name'
        }
      }
    },
    closeModal: jest.fn()
  };

  return withRouter((routerProps) => (
    <ProductAddToCartSuccessAlert {...Object.assign({}, props, routerProps, params)} />
  ));
};

describe('ProductAddToCartSuccessAlert', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
