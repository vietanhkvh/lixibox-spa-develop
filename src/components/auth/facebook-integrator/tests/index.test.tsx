import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import { INITIAL_STATE_CART } from 'flows/cart/reducer';
import FacebookIntegrator from '../component';

const component = (params = {}) => {
  const props = {
    location: { pathname: '/' },
    authStore: INITIAL_STATE_AUTH,
    cartStore: INITIAL_STATE_CART,
    unlinkSocialAccountAction: jest.fn()
  };

  return <FacebookIntegrator {...Object.assign({}, props, params)} />;
};

describe('FacebookIntegrator', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
