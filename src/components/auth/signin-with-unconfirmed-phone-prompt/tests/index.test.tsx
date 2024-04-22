import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_USER } from 'flows/user/reducer';
import { INITIAL_STATE_TRACKING } from 'flows/tracking/reducer';
import SigninWithUnconfirmedPhonePrompt from '../component';

const component = (params = {}) => {
  const props = {
    referrer: '/',
    isOnModal: false,
    onSubmit: jest.fn(),
    onAlternateLinkClick: jest.fn(),
    onSignup: jest.fn(),

    // Redux props
    userStore: INITIAL_STATE_USER,
    trackingStore: INITIAL_STATE_TRACKING,
    signUpAction: jest.fn(),
    requestOtpAction: jest.fn(),
    fetchConstantsAction: jest.fn(),
    fetchUserReferrerProfileAction: jest.fn()
  };

  return <SigninWithUnconfirmedPhonePrompt {...Object.assign({}, props, params)} />;
};

describe('SigninWithUnconfirmedPhonePrompt', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
