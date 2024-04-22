import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import { INITIAL_STATE_CART } from 'flows/cart/reducer';
import Signin from '../component';

const component = (params = {}) => {
  const props = {
    onLoginSuccess: jest.fn(),
    onLoginFailure: jest.fn(),
    onForgotPassword: jest.fn(),
    onSignup: jest.fn(),
    referrer: '/',

    // Redux props
    authStore: INITIAL_STATE_AUTH,
    cartStore: INITIAL_STATE_CART,
    signInAction: jest.fn(),
    fetchConstantsAction: jest.fn(),
    getCartAction: jest.fn()
  };

  return <Signin {...Object.assign({}, props, params)} />;
};

describe('Signin', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
