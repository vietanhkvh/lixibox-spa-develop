import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_USER } from 'flows/user/reducer';
import { INITIAL_STATE_TRACKING } from 'flows/tracking/reducer';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import Signup from '../component';

const component = (params = {}) => {
  const props = {
    isOnModal: true,
    referrer: '/',

    // Redux props
    authStore: INITIAL_STATE_AUTH,
    userStore: INITIAL_STATE_USER,
    trackingStore: INITIAL_STATE_TRACKING,
    signUpAction: jest.fn(),
    requestOtpAction: jest.fn(),
    signInFBAction: jest.fn(),
    openAlertAction: jest.fn(),
    fetchConstantsAction: jest.fn(),
    fetchUserReferrerProfileAction: jest.fn(),
    getCartAction: jest.fn(),
    fastTrackRequestOtpAction: jest.fn(),
    fastTrackVerifyOtpAction: jest.fn()
  };

  return <Signup {...Object.assign({}, props, params)} />;
};

describe('Signup', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
