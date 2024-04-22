import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import GoogleIntegrator from '../component';

const component = (params = {}) => {
  const props = {
    location: { pathname: '/' },
    authStore: INITIAL_STATE_AUTH,
    unlinkSocialAccountAction: jest.fn()
  };

  return <GoogleIntegrator {...Object.assign({}, props, params)} />;
};

describe('GoogleIntegrator', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
