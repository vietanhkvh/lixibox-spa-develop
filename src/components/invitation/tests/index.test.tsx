jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../utils/test-utils';
import Invitation from '../component';
import { INITIAL_STATE_AUTH } from '../../../flows/auth/reducer';
import { INITIAL_STATE_REFERRAL } from '../../../flows/referral/reducer';

const component = (params = {}) => {
  const props = {
    referralStore: INITIAL_STATE_REFERRAL,
    authStore: INITIAL_STATE_AUTH,
    copyTextToClipboard: jest.fn(),
    openAlertAction: jest.fn(),
    getReferralSchemesAction: jest.fn(),
    getReferralSchemeShareLinkAction: jest.fn()
  };

  return <Invitation {...Object.assign({}, props, params)} />;
};

describe('Invitation', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
