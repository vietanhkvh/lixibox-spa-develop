import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import VerifyUser from '../component';

const component = (params = {}) => {
  const props = {
    authStore: INITIAL_STATE_AUTH,
    requestOtpAction: jest.fn()
  };

  return <VerifyUser {...Object.assign({}, props, params)} />;
};

describe('VerifyUser', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
