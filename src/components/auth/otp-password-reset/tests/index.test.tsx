import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import OtpPasswordReset from '../component';

const component = (params = {}) => {
  const props = {
    referrer: '/',
    onSuccess: jest.fn(),
    onSignin: jest.fn(),

    // Redux props
    authStore: INITIAL_STATE_AUTH,
    requestOtpAction: jest.fn(),
    resetPasswordByOtpAction: jest.fn(),
    fetchConstantsAction: jest.fn()
  };

  return <OtpPasswordReset {...Object.assign({}, props, params)} />;
};

describe('OtpPasswordReset', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
