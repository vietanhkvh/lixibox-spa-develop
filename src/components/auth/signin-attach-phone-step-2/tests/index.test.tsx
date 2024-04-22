import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import SigninAttachPhoneStep2 from '../component';

const component = (params = {}) => {
  const props = {
    isOnModal: false,
    referrer: '/',
    onLoginSuccess: jest.fn(),
    onLoginFailure: jest.fn(),
    onSignup: jest.fn(),
    onInvalidState: jest.fn(),

    // Redux props
    authStore: INITIAL_STATE_AUTH,
    closeModalAction: jest.fn(),
    signInAction: jest.fn(),
    fetchConstantsAction: jest.fn(),
    getCartAction: jest.fn(),
    attachPhoneAction: jest.fn()
  };

  return <SigninAttachPhoneStep2 {...Object.assign({}, props, params)} />;
};

describe('SigninAttachPhoneStep2', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
