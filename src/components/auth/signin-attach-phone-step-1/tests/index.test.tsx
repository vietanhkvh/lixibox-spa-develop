import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import SigninAttachPhoneStep1 from '../component';

const component = (params = {}) => {
  const props = {
    referrer: '/',
    onSignup: jest.fn(),
    onInvalidState: jest.fn(),
    onCloudTokenAvailable: jest.fn(),
    onSuccess: jest.fn(),

    // Redux props
    authStore: INITIAL_STATE_AUTH,
    closeModalAction: jest.fn(),
    signInAction: jest.fn(),
    fetchConstantsAction: jest.fn(),
    requestOtpAction: jest.fn()
  };

  return <SigninAttachPhoneStep1 {...Object.assign({}, props, params)} />;
};

describe('SigninAttachPhoneStep1', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
