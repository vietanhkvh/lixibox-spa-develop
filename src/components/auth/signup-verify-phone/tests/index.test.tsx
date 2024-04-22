import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_USER } from 'flows/user/reducer';
import { INITIAL_STATE_TRACKING } from 'flows/tracking/reducer';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import SignupVerifyPhone from '../component';

const component = (params = {}) => {
  const props = {
    isOnModal: false,
    referrer: '/',
    onSignupSuccess: jest.fn(),
    onSignupFailure: jest.fn(),
    onLogin: jest.fn(),
    onInvalidState: jest.fn(),

    // Redux props
    authStore: INITIAL_STATE_AUTH,
    userStore: INITIAL_STATE_USER,
    trackingStore: INITIAL_STATE_TRACKING,
    signUpAction: jest.fn(),
    openAlertAction: jest.fn(),
    fetchConstantsAction: jest.fn(),
    fetchUserReferrerProfileAction: jest.fn(),
    getCartAction: jest.fn()
  };

  return <SignupVerifyPhone {...Object.assign({}, props, params)} />;
};

describe('SignupVerifyPhone', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
