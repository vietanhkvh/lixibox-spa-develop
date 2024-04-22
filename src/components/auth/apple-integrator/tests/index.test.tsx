import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import AppleIntegrator from '../component';

const component = (params = {}) => {
  const props = {
    authStore: INITIAL_STATE_AUTH,
    setAppleSigninStateAction: jest.fn(),
    unlinkSocialAccountAction: jest.fn()
  };

  return <AppleIntegrator {...Object.assign({}, props, params)} />;
};

describe('AppleIntegrator', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
