jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../utils/test-utils';
import InvitationMobileReferral from '../component';
import { INITIAL_STATE_AUTH } from '../../../flows/auth/reducer';
import { INITIAL_STATE_CART } from '../../../flows/cart/reducer';

const component = (params = {}) => {
  const props = {
    authStore: INITIAL_STATE_AUTH,
    cartStore: INITIAL_STATE_CART,
    className: '',
    scoopClass: '',
    copyTextToClipboard: jest.fn(),
    invitationURL: jest.fn(),
    shareOrCopyLink: jest.fn()
  };

  return <InvitationMobileReferral {...Object.assign({}, props, params)} />;
};

describe('InvitationMobileReferral', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
