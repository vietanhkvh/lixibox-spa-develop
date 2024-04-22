import { withRouter } from 'react-router-dom';
jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import { INITIAL_STATE_CART } from 'flows/cart/reducer';
import { INITIAL_STATE_SHARED_MODAL } from 'flows/shared-modal/reducer';
import UserPanel from '../component';

const component = (params = {}) => {
  const props = {
    authStore: INITIAL_STATE_AUTH,
    cartStore: INITIAL_STATE_CART,
    sharedModalStore: INITIAL_STATE_SHARED_MODAL,
    openConfirmationModalAction: jest.fn(),
    closeConfirmationModalAction: jest.fn(),
    requestPhoneVerificationOtpAction: jest.fn(),
    getEmailVerificationAction: jest.fn()
  };

  return withRouter((routerProps) => <UserPanel {...Object.assign({}, props, routerProps, params)} />);
};

describe('UserPanel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
